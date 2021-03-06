import { Body, Controller, Delete, Get, Param, Post, Put, UploadedFile, UseGuards, UsePipes } from '@nestjs/common';
import {
	ApiOperation,
	ApiResponse,
	ApiTags,
} from '@nestjs/swagger';
import { ProfileEntity } from 'src/profile/profile.entity';

import { AuthGuard } from '../guards/auth.guard';
import { RoleGuard } from '../guards/role.guard';
import { MyValidationPipe } from '../pipes/my-validation.pipe';
import { RoleEntity } from '../role/role.entity';
import { RoleService } from '../role/role.service';
import { AuthService } from './auth.service';
import { UserBlockUnblockDto } from './dto/user-block-unlock.dto';
import { UserAddRoleDto } from './dto/user.add.role.dto';
import { UserSignUpDto } from './dto/user.signup.dto';
import { Roles } from './roles-auth.decorator';
import { IUsersResponse } from './types/users.response.interface';
import { User } from './user.decorator';
import { UserEntity } from './user.entity';

@ApiTags('Пользователи')
@Controller('')
export class AuthController {
	constructor(
		private readonly authService: AuthService,
		private readonly roleService: RoleService,
	) { }

	@UsePipes(new MyValidationPipe)
	@ApiOperation({ summary: 'Регистрация пользователя' })
	@ApiResponse({ status: 201, type: UserEntity })
	@Post('auth/signup')
	async createUser(@Body() dto: UserSignUpDto) {
		const newUser = new UserEntity();
		const profile = new ProfileEntity();
		Object.assign(newUser, dto);
		newUser.profile = profile;
		const userFromBD = await this.authService.createUser(newUser);
		return this.authService.buildUserResponce(userFromBD);
	}

	@UsePipes(new MyValidationPipe)
	@ApiOperation({ summary: 'Загрузить фото пользователя' })
	@ApiResponse({ status: 201, type: UserEntity })
	@Post('user/uploadPhoto')
	async uploadImage(@User() user: UserEntity, @Body() dto: UserSignUpDto, @UploadedFile() file) {
		const newUser = new UserEntity();
		const profile = new ProfileEntity();
		Object.assign(newUser, dto);
		newUser.profile = profile;
		const userFromBD = await this.authService.createUser(newUser);
		return this.authService.buildUserResponce(userFromBD);
	}

	@UsePipes(new MyValidationPipe)
	@ApiOperation({ summary: 'Авторизация пользователя' })
	@ApiResponse({ status: 201, type: UserEntity })
	@Post('auth/login')
	async loginUser(@Body() dto: UserSignUpDto) {
		const userFromBD = await this.authService.loginUserByEmail(dto);
		return this.authService.buildUserResponce(userFromBD);
	}

	@ApiOperation({ summary: 'Блокировка пользователя' })
	@UsePipes(MyValidationPipe)
	@ApiResponse({ status: 200 })
	@Roles('UManager', 'Admin')
	@UseGuards(RoleGuard)
	@Put('users/:username/block')
	async blockUser(@Param('username') username: string, @Body() dto: UserBlockUnblockDto): Promise<{ user: UserEntity }> {
		return {
			user: await this.authService.blockUser(username, dto)
		};
	}

	@ApiOperation({ summary: 'Получить всех пользователей' })
	@ApiResponse({ status: 200 })
	@UseGuards(AuthGuard)
	@Get('users')
	async getUsers(): Promise<IUsersResponse> {
		return this.authService.getAllUsers();
	}

	@UsePipes(new MyValidationPipe())
	@ApiOperation({ summary: 'Назначение ролей пользователю' })
	@ApiResponse({ status: 200 })
	@Roles('UManager', 'Admin')
	@UseGuards(RoleGuard)
	@Put('users/:username/addRoles')
	async setRolesForUser(
		@Body() dto: UserAddRoleDto, @Param('username') username: string
	): Promise<{ user: UserEntity }> {
		const rolesEntities: RoleEntity[] = [];
		dto.roles.forEach(async (el) => {
			const role = await this.roleService.findByName(el);
			if (role) {
				rolesEntities.push(role);
			}
		});

		return {
			user: await this.authService.setRolesForUser(username, rolesEntities)
		};
	}

	@ApiOperation({ summary: 'Разбокировка пользователя' })
	@ApiResponse({ status: 200 })
	@Roles('UManager', 'Admin')
	@UseGuards(RoleGuard)
	@Put('users/:username/unlock')
	async unlockUser(@Param('username') username: string): Promise<{ user: UserEntity }> {
		return {
			user: await this.authService.unlockkUser(username)
		};
	}

	@ApiOperation({ summary: 'Удаление пользователя' })
	@ApiResponse({ status: 200 })
	@Roles('Admin', 'UManager')
	@UseGuards(RoleGuard)
	@Delete('users/:username')
	async deleteUser(@Param('username') username: string) {
		return this.authService.deleteUserByName(username);
	}
}


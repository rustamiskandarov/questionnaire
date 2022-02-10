import { Body, Controller, Get, HttpCode, HttpException, HttpStatus, NotFoundException, Param, Post, Put, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import {
	ApiBearerAuth,
	ApiOperation,
	ApiResponse,
	ApiTags,
} from '@nestjs/swagger';
import { InjectRepository } from '@nestjs/typeorm';
import { ROLE_NOT_FOUND_ERROR } from 'src/exeptions-consts';
import { AuthGuard } from 'src/guards/auth.guard';
import { RoleGuard } from 'src/guards/role.guard';
import { RoleEntity } from 'src/role/role.entity';
import { RoleService } from 'src/role/role.service';
import { Repository } from 'typeorm';
import { AuthService } from './auth.service';
import { UserSignUpDto } from './dto/user.signup.dto';
import { Roles } from './roles-auth.decorator';
import { IUserResponse } from './types/user.response.interface';
import { IUsersResponse } from './types/users.response.interface';
import { UserEntity } from './user.entity';

@ApiTags('Пользователи')
@Controller('')
export class AuthController {
	constructor(
		private readonly authService: AuthService,
		private readonly roleService: RoleService,
	) { }

	@UsePipes(new ValidationPipe)
	@ApiOperation({ summary: 'Регистрация пользователя' })
	@ApiResponse({ status: 200, type: UserEntity })
	@Post('auth/signup')
	async createUser(@Body() dto: UserSignUpDto) {
		const newUser = new UserEntity();
		Object.assign(newUser, dto);
		const userFromBD = await this.authService.createUser(newUser);
		return this.authService.buildUserResponce(userFromBD);
	}

	@UsePipes(new ValidationPipe)
	@ApiOperation({ summary: 'Авторизация пользователя' })
	@ApiResponse({ status: 200, type: UserEntity })
	@Post('auth/login')
	async loginUser(@Body() dto: UserSignUpDto) {
		const newUser = new UserEntity();
		Object.assign(newUser, dto);
		const userFromBD = await this.authService.loginUserByEmail(newUser);
		return this.authService.buildUserResponce(userFromBD);
	}

	@ApiOperation({ summary: 'Получить всех пользователей' })
	@ApiResponse({ status: 200 })
	@UseGuards(AuthGuard)
	@Get('users')
	async getUsers(): Promise<IUsersResponse> {
		return this.authService.getAllUsers();
	}

	@ApiOperation({ summary: 'Назначение ролей пльзователю' })
	@ApiResponse({ status: 200 })
	@Roles("UManager")
	@UseGuards(RoleGuard)
	@Put('users/:username/addRoles')
	async setRolesForUser(@Body('roles') roles: string[], @Param('username') username: string): Promise<{ user: UserEntity }> {

		const rolesEntities: RoleEntity[] = [];

		roles.forEach( async (el) => {
			const role = await this.roleService.findByName(el);
			await rolesEntities.push(role)
		})

		return {
			user: await this.authService.setRolesForUser(username, rolesEntities)
		};


	}
}


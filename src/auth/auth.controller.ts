import { Body, Controller, Get, Param, Post, Put, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import {
	ApiBearerAuth,
	ApiOperation,
	ApiResponse,
	ApiTags,
} from '@nestjs/swagger';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthGuard } from 'src/guards/auth-guard';
import { RoleEntity } from 'src/role/role.entity';
import { Repository } from 'typeorm';
import { AuthService } from './auth.service';
import { UserSignUpDto } from './dto/user.signup.dto';
import { IUserResponse } from './types/user.response.interface';
import { IUsersResponse } from './types/users.response.interface';
import { UserEntity } from './user.entity';

@ApiTags('Пользователи')
@Controller('')
export class AuthController {
	constructor(private readonly authService: AuthService) { }

	@UsePipes(new ValidationPipe)
	@ApiOperation({summary: 'Регистрация пользователя'})
	@ApiResponse({status: 200, type: UserEntity})
	@Post('auth/signup')
	async createUser(@Body() dto: UserSignUpDto) {
		const newUser = new UserEntity();
		Object.assign(newUser, dto);
		const userFromBD =  await this.authService.createUser(newUser);
		return this.authService.buildUserResponce(userFromBD);
	}

	@UsePipes(new ValidationPipe)
	@ApiOperation({summary: 'Авторизация пользователя'})
	@ApiResponse({status: 200, type: UserEntity})
	@Post('auth/login')
	async loginUser(@Body() dto: UserSignUpDto) {
		const newUser = new UserEntity();
		Object.assign(newUser, dto);
		const userFromBD = await this.authService.loginUserByEmail(newUser);
		return this.authService.buildUserResponce(userFromBD);
	}

	@ApiOperation({summary: 'Получить всех пользователей'})
	@ApiResponse({ status: 200})
	@UseGuards(AuthGuard)
	@Get('users')
	async getUsers(): Promise<IUsersResponse>{
		return this.authService.getAllUsers();
	}

	@ApiOperation({summary: 'Назначении роли пльзователю'})
	@ApiResponse({ status: 200})
	@UseGuards(AuthGuard)
	@Put('users/:username/addRoles')
	async addRoleForUser(@Body('roles') roles: string[], @Param('username') username: string): Promise<{user: UserEntity}>{
		const rolesEntities: RoleEntity[] = [];

		return {
			user: await this.authService.addRolesForUser(username, rolesEntities)
		};
	}
}


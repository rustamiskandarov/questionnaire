import { Body, Controller, Get, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import {
	ApiBearerAuth,
	ApiOperation,
	ApiResponse,
	ApiTags,
} from '@nestjs/swagger';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthGuard } from 'src/guards/auth-guard';
import { Repository } from 'typeorm';
import { AuthService } from './auth.service';
import { UserSignUpDto } from './dto/user.signup.dto';
import { IUsersResponse } from './types/users.response.interface';
import { UserEntity } from './user.entity';

@ApiTags('Пользователи')
@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) { }

	@UsePipes(new ValidationPipe)
	@ApiOperation({summary: 'Регистрация пользователя'})
	@ApiResponse({status: 200, type: UserEntity})
	@Post('signup')
	async createUser(@Body() dto: UserSignUpDto) {
		const newUser = new UserEntity();
		Object.assign(newUser, dto);
		const userFromBD =  await this.authService.createUser(newUser);
		return this.authService.buildUserResponce(userFromBD);
	}

	@UsePipes(new ValidationPipe)
	@ApiOperation({summary: 'Авторизация пользователя'})
	@ApiResponse({status: 200, type: UserEntity})
	@Post('login')
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
}


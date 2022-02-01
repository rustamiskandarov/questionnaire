import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import {
	ApiBearerAuth,
	ApiOperation,
	ApiResponse,
	ApiTags,
} from '@nestjs/swagger';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthService } from './auth.service';
import { UserSignUpDto } from './dto/user.signup.dto';
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
		return await this.authService.createUser(newUser);
	}
}


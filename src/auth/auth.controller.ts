import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserSignUpDto } from './dto/user.signup.dto';
import { UserEntity } from './user.entity';

@Controller('auth')
export class AuthController {
	constructor(@InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>) { }
	@UsePipes(new ValidationPipe)
	@Post('signup')
	async createUser(@Body() dto: UserSignUpDto) {
		const newUser = new UserEntity();
		Object.assign(newUser, dto);
		return await this.userRepository.save(newUser);
	}
}

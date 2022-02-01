import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { hash } from 'bcrypt';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';

@Injectable()
export class AuthService {
	
	constructor(@InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>){}
	async createUser(newUser: UserEntity): Promise<UserEntity> {
		newUser.password = await hash(newUser.password, 10);
		return await this.userRepository.save(newUser);
	}
}

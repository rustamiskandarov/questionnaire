import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { hash, compare } from 'bcrypt';
import { getRepository, Repository } from 'typeorm';
import { UserEntity } from './user.entity';

import { sign } from 'jsonwebtoken';
import { EMAIL_IS_BUSY_ERROR, USERNAME_IS_BUSY_ERROR, USER_NOT_FOUND_ERROR, USER_NO_EXISTS_ERROR, WRONG_LOGIN_AND_PASSWORD_ERROR } from 'src/exeptions-consts';
import { IUserResponse } from './types/user.response.interface';
import { RoleEntity } from 'src/role/role.entity';

@Injectable()
export class AuthService {
	constructor(@InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
		//private jwtService: JwtService
	){}

	async getAllUsers() {
		//const users = await this.userRepository.find();
		const queryBuilder = getRepository(UserEntity)
			.createQueryBuilder('users')
			.leftJoinAndSelect('users.roles', 'roles');
		queryBuilder.orderBy('users.createdAt', 'DESC');
		const users = await queryBuilder.getMany();
		return {
			users
		};
	}

	async setRolesForUser(username: string, rolesEntities: RoleEntity[]): Promise<UserEntity>  {
		const user = await this.findByUsername(username);
		user.roles = rolesEntities;
		return this.userRepository.save(user);
	}
	
	async findById(id: any) {
		return await this.userRepository.findOne({id});
	}
	async findByUsername(username: string): Promise<UserEntity> {
		const user = await this.userRepository.findOne({username});
		if(!user){
			throw new NotFoundException(USER_NOT_FOUND_ERROR);
		}
		return user;
	}



	async createUser(newUser: UserEntity): Promise<UserEntity> {
		newUser.password = await hash(newUser.password, 10);
		const oldUserByEmail = await this.getUserByEmail(newUser.email);
		const oldUserByUsername = await this.userRepository.findOne({username: newUser.username});
		if(oldUserByEmail){
			throw new BadRequestException(EMAIL_IS_BUSY_ERROR);
		}
		if (oldUserByUsername){
			throw new BadRequestException(USERNAME_IS_BUSY_ERROR);
		}

		return await this.userRepository.save(newUser);
	}
	async loginUserByEmail(user: UserEntity): Promise<UserEntity>{
		const userFromBD = await this.userRepository.findOne({ email: user.email }, { select: ['id', 'username', 'email', 'password', 'roles']});

		let comparePassword = false;
		if (userFromBD) {
			comparePassword = await compare(user.password, userFromBD.password);
		} 
		
		if (!userFromBD || !comparePassword){
			throw new UnauthorizedException(WRONG_LOGIN_AND_PASSWORD_ERROR);
		}
		delete userFromBD.password;
		return comparePassword ? userFromBD : null;
	}
	
	private async getUserByEmail(email: string){
		return await this.userRepository.findOne({email});
	}

	async buildUserResponce(user: UserEntity):Promise<IUserResponse>{
		return {
			user: {
				...user,
				token: 'Barear '+await this.generateToken(user)
			}
		};
		
	}

	private generateToken(user: UserEntity){
		return sign({
			id: user.id,
			username: user.username,
			email: user.email
		}, process.env.JWT_SECRET);
		
	}

	async blockUser(username: string, reason: string): Promise<UserEntity> {
		const user = await this.findByUsername(username);
		user.isActive = false;
		user.blockedReason = reason;
		return await this.userRepository.save(user);
	}

	async unlockkUser(username: string): Promise<UserEntity> {
		const user = await this.findByUsername(username);
		user.isActive = true;
		user.blockedReason = '';
		return await this.userRepository.save(user);
	}


}

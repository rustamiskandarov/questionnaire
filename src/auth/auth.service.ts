import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { hash, compare } from 'bcrypt';
import { getRepository, Repository } from 'typeorm';
import { UserEntity } from './user.entity';

import { sign } from 'jsonwebtoken';
import { EMAIL_IS_BUSY_ERROR, USERNAME_IS_BUSY_ERROR, USER_NOT_FOUND_ERROR, WRONG_LOGIN_AND_PASSWORD_ERROR } from '../exeptions-consts';
import { IUserResponse } from './types/user.response.interface';
import { RoleEntity } from '../role/role.entity';
import { UserBlockUnblockDto } from './dto/user-block-unlock.dto';
import { CustomException } from '../exceptions/custom.exception';
import { UserSignUpDto } from './dto/user.signup.dto';

@Injectable()
export class AuthService {
	constructor(@InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
		//private jwtService: JwtService
	) { }

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

	async setRolesForUser(username: string, rolesEntities: RoleEntity[]): Promise<UserEntity> {
		const user = await this.findByUsername(username);
		user.roles = rolesEntities;
		return this.userRepository.save(user);
	}

	async findById(id: any) {
		return await this.userRepository.findOne({ id });
	}
	async findByUsername(username: string): Promise<UserEntity> {
		const user = await this.userRepository.findOne({ username });
		if (!user) {
			throw new CustomException({ 'user': USER_NOT_FOUND_ERROR }, HttpStatus.NOT_FOUND);
		}
		return user;
	}



	async createUser(newUser: UserEntity): Promise<UserEntity> {
		const errorResponse = {
			errors: {}
		}
		newUser.password = await hash(newUser.password, 10);
		const oldUserByEmail = await this.getUserByEmail(newUser.email);
		const oldUserByUsername = await this.userRepository.findOne({ username: newUser.username });
		if (oldUserByEmail) {
			errorResponse.errors['email'] = EMAIL_IS_BUSY_ERROR;
		}
		if (oldUserByUsername) {
			errorResponse.errors['username'] = USERNAME_IS_BUSY_ERROR;
		}
		if (oldUserByUsername || oldUserByEmail) {
			throw new HttpException(errorResponse, HttpStatus.UNPROCESSABLE_ENTITY);
		}

		return await this.userRepository.save(newUser);
	}
	async loginUserByEmail(userDto: UserSignUpDto): Promise<UserEntity> {

		const errorResponse = {
			errors: {
				'email or password': WRONG_LOGIN_AND_PASSWORD_ERROR
			}
		};
		const userFromBD = await this.userRepository.findOne({ email: userDto.email }, { select: ['id', 'username', 'email', 'password'] });

		let comparePassword = false;
		if (userFromBD) {
			comparePassword = await compare(userDto.password, userFromBD.password);
		}

		if (!userFromBD || !comparePassword) {
			throw new UnauthorizedException(errorResponse);
		}

		delete userFromBD.password;
		return comparePassword ? userFromBD : null;
	}

	private async getUserByEmail(email: string) {
		return await this.userRepository.findOne({ email });
	}

	async buildUserResponce(user: UserEntity): Promise<IUserResponse> {
		return {
			user: {
				...user,
				token: 'Barear ' + await this.generateToken(user)
			}
		};

	}

	private generateToken(user: UserEntity) {
		return sign({
			id: user.id,
			username: user.username,
			email: user.email
		}, process.env.JWT_SECRET);

	}

	async blockUser(username: string, reasonDto: UserBlockUnblockDto): Promise<UserEntity> {
		const user = await this.findByUsername(username);
		user.isActive = false;
		user.blockedReason = reasonDto.reason;
		return await this.userRepository.save(user);
	}

	async unlockkUser(username: string): Promise<UserEntity> {
		const user = await this.findByUsername(username);
		user.isActive = true;
		user.blockedReason = '';
		return await this.userRepository.save(user);
	}

	async deleteUserByName(username: string) {
		const user = await this.findByUsername(username);
		return await this.userRepository.delete(user);
	}
}

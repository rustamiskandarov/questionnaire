import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { hash, compare } from 'bcrypt';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { JwtService} from '@nestjs/jwt';
import { EMAIL_IS_BUSY_ERROR, USER_NO_EXISTS_ERROR, WRONG_LOGIN_AND_PASSWORD_ERROR } from 'src/exeptions-consts';
import { IUserResponse } from './types/user.response.interface';

@Injectable()
export class AuthService {
	
	constructor(@InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
		private jwtService: JwtService
	){}
	async createUser(newUser: UserEntity): Promise<UserEntity> {
		newUser.password = await hash(newUser.password, 10);
		const oldUser = await this.getUserByEmail(newUser.email);
		if(oldUser){
			throw new BadRequestException(EMAIL_IS_BUSY_ERROR);
		}
		return await this.userRepository.save(newUser);
	}
	async loginUserByEmail(user: UserEntity): Promise<UserEntity>{
		const userFromBD = await this.userRepository.findOne({ email: user.email }, { select: ['id', 'username', 'email', 'password']});
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

	private async generateToken(user: UserEntity){
		const token = await this.jwtService.signAsync({
			id: user.id,
			username: user.username,
			email: user.email
		});
		
		return token;
	}


}

import { IsEmail, IsEmpty, IsNotEmpty, IsString } from 'class-validator';


export class UserSignUpDto{
	
	@IsString()
	username: string;
	
	@IsEmail()
	email: string;
	
	@IsString()
	password: string;
}


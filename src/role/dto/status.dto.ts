import { IsString, IsNotEmpty } from 'class-validator';

export class StatusDto {
	@IsString()
	@IsNotEmpty()
	status: string;
}
import { IsString, IsNotEmpty } from 'class-validator';

export class StatusUpdateDto {
	@IsNotEmpty()
	@IsString()
	status: string;
	@IsNotEmpty()
	@IsString()
	roleName: string;
}
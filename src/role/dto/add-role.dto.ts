import { IsString, IsNotEmpty } from "class-validator";

export class AddRoleDTO {
	@IsString()
	@IsNotEmpty()
	name: string
	@IsString()
	description: string
}
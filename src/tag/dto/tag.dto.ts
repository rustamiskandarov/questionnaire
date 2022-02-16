import { IsNotEmpty, IsString } from "class-validator";
import { FIELD_MUST_BY_NOT_EMPTY, VALUE_MUST_BY_STRING } from "../../exeptions-consts";

export class TagDto {
	@IsNotEmpty({ message: FIELD_MUST_BY_NOT_EMPTY })
	@IsString({ message: VALUE_MUST_BY_STRING })
	name: string;
	
	@IsString({ message: VALUE_MUST_BY_STRING })
	description: string;


}
import { IsNotEmpty, IsString } from "class-validator";
import { FIELD_MUST_BY_NOT_EMPTY, VALUE_MUST_BY_STRING } from "src/exeptions-consts";

export class UserBlockUnblockDto {
	@IsNotEmpty({ message: FIELD_MUST_BY_NOT_EMPTY })
	@IsString({message: VALUE_MUST_BY_STRING})
	reason: string;
}
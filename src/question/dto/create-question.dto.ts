
import { IsNotEmpty, IsString, Length} from "class-validator";
import { FIELD_MUST_BY_NOT_EMPTY, VALUE_MUST_BY_IN_RANGE_VALUE, VALUE_MUST_BY_STRING } from "../../exeptions-consts";
import { isArrayBuffer } from "util/types";

export class CreateQuestionDto{
	@IsNotEmpty({ message: FIELD_MUST_BY_NOT_EMPTY})
	@IsString({message: VALUE_MUST_BY_STRING})
	@Length(6, 16, { message: `${VALUE_MUST_BY_IN_RANGE_VALUE} от 6 до 500 симовлов` })
	title: string;
	@IsNotEmpty()
	@IsString({ message: FIELD_MUST_BY_NOT_EMPTY })
	body: string;
	@IsString({each: true})
	tagList: string[]
}
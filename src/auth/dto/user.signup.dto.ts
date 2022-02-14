import { IsEmail, IsEmpty, IsNotEmpty, IsString, Length } from 'class-validator';
import { FIELD_MUST_BY_NOT_EMPTY, VALUE_MUST_BY_EMAIL_FORMAT, VALUE_MUST_BY_IN_RANGE_VALUE, VALUE_MUST_BY_STRING } from 'src/exeptions-consts';


export class UserSignUpDto{
	@IsNotEmpty({ message: FIELD_MUST_BY_NOT_EMPTY })
	@IsString({ message: VALUE_MUST_BY_STRING })
	username: string;

	@IsNotEmpty({ message: FIELD_MUST_BY_NOT_EMPTY})
	@IsEmail({},{ message: VALUE_MUST_BY_EMAIL_FORMAT})
	email: string;

	@IsNotEmpty({ message: FIELD_MUST_BY_NOT_EMPTY })
	@IsString({ message: VALUE_MUST_BY_STRING})
	@Length(6, 16, { message: `${VALUE_MUST_BY_IN_RANGE_VALUE} от 6 до 16 симовлов`})
	password: string;
}


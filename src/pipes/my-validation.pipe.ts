import { ArgumentMetadata, HttpException, HttpStatus, PipeTransform, ValidationError } from "@nestjs/common";
import { plainToClass } from "class-transformer";
import { validate } from "class-validator";
import { ValidationException } from "src/exceptions/validation.exception";


export class MyValidationPipe implements PipeTransform {
	async transform(value: any, metadata: ArgumentMetadata) {
		const object = plainToClass(metadata.metatype, value);

		let errors=[];
		if (typeof object == 'object'){
			errors = await validate(object);
		}
		if (errors.length === 0) {
			return value;
		}

		throw new ValidationException(this.forrmatError(errors))
	}

	private forrmatError(errors: ValidationError[]) {

		return errors.reduce((acc, err) => {
			acc[err.property] = Object.values(err.constraints);
			return acc;
		}, {})
	}


}
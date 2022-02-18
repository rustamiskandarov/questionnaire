import { HttpException, HttpStatus } from "@nestjs/common";

export class CustomException extends HttpException {
	message;
	constructor(response, status = HttpStatus.BAD_REQUEST){
		super({errors: response}, status);
		this.message = response;
	}
}
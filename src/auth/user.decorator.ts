import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { IUserResponse } from './types/user.response.interface';

export const User = createParamDecorator((data: any, context: ExecutionContext) => {
	const request = context.switchToHttp().getRequest<IUserResponse>();
	if (!request.user) {
		return null;
	}

	if (data) {
		return request.user[data];
	}
	return request.user;
});
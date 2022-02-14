import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { IUserRequestExpress } from '../auth/types/user.request.interface';
import { USER_UNAUTHORIZED_ERROR } from '../exeptions-consts';

@Injectable()
export class AuthGuard implements CanActivate {
	canActivate(context: ExecutionContext): boolean {
		const request = context.switchToHttp().getRequest<IUserRequestExpress>();
		if (request.user) {
			return true;
		}
		throw new HttpException(USER_UNAUTHORIZED_ERROR, HttpStatus.UNAUTHORIZED);
	}

}
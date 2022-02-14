import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { userInfo } from 'os';
import { ROLES_KEY } from '../auth/roles-auth.decorator';
import { IUserRequestExpress } from '../auth/types/user.request.interface';
import { ACCESS_DENIED_ERROR, USER_UNAUTHORIZED_ERROR } from '../exeptions-consts';
import { resourceLimits } from 'worker_threads';

@Injectable()
export class RoleGuard implements CanActivate {
	constructor(private reflector: Reflector){}
	canActivate(context: ExecutionContext): boolean {
		
		try {
			const request = context.switchToHttp().getRequest<IUserRequestExpress>();
			const requaredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
				context.getHandler(),
				context.getClass()
			])
			if(!requaredRoles) return true;
			return request.user.roles.some(role=>requaredRoles.includes(role.name));
		
		} catch (error) {
			throw new HttpException(ACCESS_DENIED_ERROR, HttpStatus.FORBIDDEN);
		}


		
	}

}
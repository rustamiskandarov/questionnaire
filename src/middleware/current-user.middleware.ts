import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { AuthService } from '../auth/auth.service';
import { IUserRequestExpress } from '../auth/types/user.request.interface';


@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {
	constructor(private readonly authService: AuthService) { }
	async use(req: IUserRequestExpress, res: Response, next: () => void) {
		if (!req.headers.authorization) {
			req.user = null;
			next();
			return;
		}
		const token = req.headers.authorization.split(' ')[1];
		try {
			// tslint:disable-next-line: await-promise
			const userInfo = await verify(token, process.env.JWT_SECRET);
			const user = await this.authService.findById(userInfo.id);
			req.user = user;
		} catch (error) {
			req.user = null;
		}
		next();
	}

}
import { Request } from 'express';
import { UserEntity } from '../user.entity';

export interface IUserRequestExpress extends Request {
	user?: UserEntity;
}
import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NotFoundError } from 'rxjs';
import { StatusCodeEnum } from 'src/enums/status-code.enum';
import { ROLE_NOT_FOUND_ERROR } from 'src/exeptions-consts';
import { DeleteDateColumn, Repository } from 'typeorm';
import { AddRoleDTO } from './dto/add-role.dto';
import { RoleEntity } from './role.entity';

@Injectable()
export class RoleService {



	constructor(@InjectRepository(RoleEntity) private readonly roleRepository: Repository<RoleEntity>){}

	async updateStatusByName(name: string, status: string): Promise<RoleEntity> {
		const role : RoleEntity = await this.roleRepository.findOne({name});
		if(!role){
			throw new NotFoundException(ROLE_NOT_FOUND_ERROR);
		}
		const newStatus = StatusCodeEnum[status];
		Logger.debug(newStatus);
		role.status = newStatus;
		return await this.roleRepository.save(role);



	}

	async getAllRoles():Promise<RoleEntity[]>  {
		return await this.roleRepository.find();
	}

	async addRole(dto: AddRoleDTO): Promise<RoleEntity> {
		return await this.roleRepository.save(dto);
	}

	async deleteRoleByName(name: string){
		return this.roleRepository.delete({name});
	}
}

import { BadRequestException, HttpStatus, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StatusCodeEnum } from '../enums/status-code.enum';
import { ValidationException } from '../exceptions/validation.exception';
import { ROLE_ALREADY_EXISTS_ERROR, ROLE_NOT_FOUND_ERROR, STAUS_NOT_FOUND_ERROR } from '../exeptions-consts';
import { DeleteDateColumn, Repository } from 'typeorm';
import { AddRoleDTO } from './dto/add-role.dto';
import { RoleEntity } from './role.entity';

@Injectable()
export class RoleService {



	constructor(@InjectRepository(RoleEntity) private readonly roleRepository: Repository<RoleEntity>) { }

	async updateStatusByName(name: string, status: string): Promise<RoleEntity> {

		const roleFromDB = await this.roleRepository.findOne({ name });
		if (!roleFromDB) {
			throw new ValidationException(ROLE_NOT_FOUND_ERROR, HttpStatus.NOT_FOUND)
		}
		const newStatus = StatusCodeEnum[status];
		if (!newStatus) {
			throw new ValidationException(STAUS_NOT_FOUND_ERROR, HttpStatus.NOT_FOUND);
		}
		roleFromDB.status = newStatus;
		if (roleFromDB) {
			return await this.roleRepository.save(roleFromDB);
		}
	}


	async getAllRoles(): Promise<RoleEntity[]> {
		return await this.roleRepository.find();
	}

	async addRole(dto: AddRoleDTO): Promise<RoleEntity> {
		if (await this.findByName(dto.name)) {
			throw new ValidationException(ROLE_ALREADY_EXISTS_ERROR);
		}
		return await this.roleRepository.save(dto);
	}

	async deleteRoleByName(name: string) {
		return this.roleRepository.delete({ name });
	}

	
	async findByName(name: string): Promise<RoleEntity> {
		return await this.roleRepository.findOne({ name });
	}
}

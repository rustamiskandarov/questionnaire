import { Body, Controller, Delete, Get, Logger, Param, Patch, Post, Put, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { StatusCodeEnum } from 'src/enums/status-code.enum';
import { AuthGuard } from 'src/guards/auth-guard';
import { DeleteResult } from 'typeorm';
import { AddRoleDTO } from './dto/add-role.dto';
import { RoleEntity } from './role.entity';
import { RoleService } from './role.service';
import { IRoleResponse } from './types/role.response';
import { IRolesResponse } from './types/roles.response';


@ApiTags('Роли пользователй')
@Controller('roles')
export class RoleController {

	constructor(private readonly roleService: RoleService){}

	@ApiOperation({ summary: 'Получить все роли' })
	@ApiResponse({ status: 200 })
	@UseGuards(AuthGuard)
	@Get('')
	async getRoles(): Promise<IRolesResponse> {
		const roles = await this.roleService.getAllRoles();
		return {roles: roles};
	}
	@UsePipes(new ValidationPipe)
	@ApiOperation({ summary: 'Добавить роль' })
	@ApiResponse({ status: 200 })
	@UseGuards(AuthGuard)
	@Post('add')
	async setRole(@Body() dto: AddRoleDTO): Promise<IRoleResponse> {
		const defaultStatus = StatusCodeEnum.Active;
		const role = new RoleEntity;
		role.status = defaultStatus;
		Object.assign(role, dto);
		return { role: await this.roleService.addRole(role) };
	}
	
	@ApiOperation({ summary: 'Удалить роль' })
	@ApiResponse({ status: 200 })
	@UseGuards(AuthGuard)
	@Delete(':name')
	async deleteRole(@Param('name') name: string): Promise<DeleteResult> {
		return await this.roleService.deleteRoleByName(name);
	}

	@ApiOperation({ summary: 'Изменить статус у роли' })
	@ApiResponse({ status: 200 })
	@UseGuards(AuthGuard)
	@Put(':name')
	async updateStatusByName(@Body('status') status: string, @Param('name') name: string): Promise<IRoleResponse> {
		return { role: await this.roleService.updateStatusByName(name, status)};
	}
}

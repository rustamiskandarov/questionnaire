import { Body, Controller, Delete, Get, Logger, Param, Patch, Post, Put, UseGuards, UsePipes } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { StatusCodeEnum } from 'src/enums/status-code.enum';
import { AuthGuard } from 'src/guards/auth.guard';
import { MyValidationPipe } from 'src/pipes/my-validation.pipe';
import { DeleteResult } from 'typeorm';
import { AddRoleDTO } from './dto/add-role.dto';
import { StatusUpdateDto } from './dto/status-update.dto';
import { StatusDto } from './dto/status.dto';
import { RoleEntity } from './role.entity';
import { RoleService } from './role.service';
import { IRoleResponse } from './types/role.response';
import { IRolesResponse } from './types/roles.response';


@ApiTags('Роли пользователй')
@Controller('roles')
export class RoleController {

	constructor(private readonly roleService: RoleService) { }

	@ApiOperation({ summary: 'Получить все роли' })
	@ApiResponse({ status: 200 })
	@UseGuards(AuthGuard)
	@Get('')
	async getRoles(): Promise<IRolesResponse> {
		const roles = await this.roleService.getAllRoles();
		return { roles: roles };
	}
	@UsePipes(MyValidationPipe)
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
	@UsePipes(MyValidationPipe)
	@ApiOperation({ summary: 'Изменить статус у роли' })
	@ApiResponse({ status: 200 })
	@UseGuards(AuthGuard)
	@Put(':roleName')
	async updateStatusByName(@Body() dto: StatusDto, @Param('roleName') roleName: string) : Promise<IRoleResponse> {

		return { role: await this.roleService.updateStatusByName(roleName, dto.status) };
	}
	
	@UsePipes(MyValidationPipe)
	@ApiOperation({ summary: 'Изменить статус у роли' })
	@ApiResponse({ status: 200 })
	@UseGuards(AuthGuard)
	@Put('')
	async updateStatus(@Body() dto: StatusUpdateDto) : Promise<IRoleResponse> {
		return { role: await this.roleService.updateStatusByName(dto.roleName, dto.status) };
	}
}

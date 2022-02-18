import { Body, Controller, Delete, Get, Param, Post, UseGuards, UsePipes } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Roles } from '../auth/roles-auth.decorator';
import { RoleGuard } from '../guards/role.guard';
import { MyValidationPipe } from '../pipes/my-validation.pipe';
import { TagDto } from './dto/tag.dto';
import { TagEntity } from './tag.entity';
import { TagService } from './tag.service';

@Controller('tag')
export class TagController {
	constructor(
		private readonly tagService: TagService,
	) { }

	@UsePipes(new MyValidationPipe)
	@ApiOperation({ summary: 'добавление нового тега' })
	@ApiResponse({ status: 201, type: TagEntity })
	@Post('')
	async createUser(@Body() dto: TagDto):Promise<{tag: TagEntity}> {
		
		const tagFromBD = await this.tagService.saveTag(dto);
		return {
			tag: tagFromBD
		}
	}

	@ApiOperation({ summary: 'Удаление тега' })
	@ApiResponse({ status: 200 })
	@Roles("Admin", "UManager")
	@UseGuards(RoleGuard)
	@Delete('/:slug')
	async deleteUser(@Param('slug') slug: string) {
		return this.tagService.deleteOneBySlug(slug);
	}


	@ApiOperation({ summary: 'Получить список тегов в виде массива строк' })
	@Get()
	async getAllToArrayString(): Promise<{ tags: string[] }> {
		const tags = await this.tagService.findAll();
		return {
			tags: tags.map((tag) => tag.name),
		}
	}
}

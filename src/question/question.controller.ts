import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, UseGuards, UsePipes } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthService } from '../auth/auth.service';
import { UserAddRoleDto } from '../auth/dto/user.add.role.dto';
import { Roles } from '../auth/roles-auth.decorator';
import { User } from '../auth/user.decorator';
import { UserEntity } from '../auth/user.entity';
import { CustomException } from '../exceptions/custom.exception';
import { USER_NOT_FOUND_ERROR } from '../exeptions-consts';
import { AuthGuard } from '../guards/auth.guard';
import { RoleGuard } from '../guards/role.guard';
import { MyValidationPipe } from '../pipes/my-validation.pipe';
import { CreateQuestionDto } from './dto/create-question.dto';
import { QuestionEntity } from './question.entity';
import { QuestionService } from './question.service';

@Controller('question')
export class QuestionController {

	constructor(
		private readonly questionService: QuestionService,
		private readonly authService: AuthService,
	) { }

	@UsePipes(new MyValidationPipe)
	@ApiOperation({ summary: 'добавление нового вопроса' })
	@UseGuards(AuthGuard)
	@ApiResponse({ status: 201, type: QuestionEntity })
	@Post('')
	async createQuestion(@User() user: UserEntity, @Body() dto: CreateQuestionDto): Promise<{ question: QuestionEntity }> {
		const author = await this.authService.findByUsername(user.username);
		if(!author){
			throw new CustomException(USER_NOT_FOUND_ERROR, HttpStatus.NOT_FOUND);
		}
		const questionFromBD = await this.questionService.saveQuestion(dto, author);
		return {
			question: questionFromBD
		}
	}
	@UsePipes(new MyValidationPipe)
	@ApiOperation({ summary: 'редактирование вопроса' })
	@UseGuards(AuthGuard)
	@ApiResponse({ status: 201, type: QuestionEntity })
	@Put('/:slug')
	async updateQuestion(@User() user: UserEntity, @Body() dto: CreateQuestionDto,@Param('slug') slug: string): Promise<{ question: QuestionEntity }> {
		const author = await this.authService.findByUsername(user.username);
		if(!author){
			throw new CustomException(USER_NOT_FOUND_ERROR, HttpStatus.NOT_FOUND);
		}

		const updatedQuestion = await this.questionService.updateQuestion(dto, slug, author.id);
		return {
			question: updatedQuestion
		}
	}

	@ApiOperation({ summary: 'Удаление тега' })
	@ApiResponse({ status: 200 })
	@UseGuards(AuthGuard)
	@Delete('/:slug')
	async deleteUser(@Param('slug') slug: string) {
		return this.questionService.deleteOneBySlug(slug);
	}


	// @ApiOperation({ summary: 'Получить список тегов в виде массива строк' })
	// @Get()
	// async getAllToArrayString(): Promise<{ tags: string[] }> {
	// 	const tags = await this.questionService.findAll();
	// 	return {
	// 		tags: tags.map((tag) => tag.name),
	// 	}
	// }

}

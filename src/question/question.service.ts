import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { createSlug } from '../utils/create-slug';
import { DeleteResult, Repository } from 'typeorm';
import { CreateQuestionDto } from './dto/create-question.dto';
import { QuestionEntity } from './question.entity';
import { TagEntity } from '../tag/tag.entity';
import { CustomException } from '../exceptions/custom.exception';
import { QUESTION_NOT_FOUND_ERROR } from '../exeptions-consts';
import { UserEntity } from '../auth/user.entity';

@Injectable()
export class QuestionService {
	constructor(@InjectRepository(QuestionEntity) private readonly questionRepository: Repository<QuestionEntity>) { }

	async saveQuestion(questionDto: CreateQuestionDto, user: UserEntity): Promise<QuestionEntity> {
		const newQuestion = new QuestionEntity();
		Object.assign(newQuestion, questionDto);
		newQuestion.author = user;
		newQuestion.slug = createSlug(questionDto.title);
		return await this.questionRepository.save(newQuestion);
	}
	async updateQuestion(questionDto: CreateQuestionDto, slug: string, authorId: string): Promise<QuestionEntity> {

		const question = await this.findOneBySlugWithAuthor(slug, authorId);

		Object.assign(question, questionDto);
		if(questionDto.title){
			question.slug = createSlug(questionDto.title);
		}
		
		
		return await this.questionRepository.save(question);
	}

	async findAll() {
		return await this.questionRepository.find();
	}
	async findOneBySlug(slug: string): Promise<QuestionEntity> {
		const question = await this.questionRepository.findOne({ slug });
		if (!question){
			throw new CustomException(QUESTION_NOT_FOUND_ERROR, HttpStatus.NOT_FOUND)
		}
		return question;
	}
	async findOneBySlugWithAuthor(slug: string, authorId: string): Promise<QuestionEntity> {
		const question = await this.questionRepository.findOne({
			where:{
				question: {slug, authorId}
			},
			relations: ["author"]
		});
		if (!question){
			throw new CustomException(QUESTION_NOT_FOUND_ERROR, HttpStatus.NOT_FOUND)
		}
		return question;
	}
	
	async deleteOneBySlug(slug: string): Promise<DeleteResult> {
		return await this.questionRepository.delete({ slug });
	}

	async setTagBySlug(slug: string, tag: TagEntity){
		const question = await this.findOneBySlug(slug);
		question.tags = [tag];
		return this.questionRepository.save(question);
	}
}


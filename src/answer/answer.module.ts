import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnswerEntity } from './answer.entity';
import { CommentEntity } from '../comment/comment.entity';
import { QuestionModule } from 'src/question/question.module';

@Module({
	imports: [QuestionModule, TypeOrmModule.forFeature([AnswerEntity, CommentEntity])]
})
export class AnswerModule {}

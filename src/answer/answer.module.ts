import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../auth/user.entity';
import { CommentEntity } from '../comment/comment.entity';

import { QuestionModule } from '../question/question.module';
import { AnswerEntity } from './answer.entity';

@Module({
	imports: [QuestionModule, TypeOrmModule.forFeature([AnswerEntity, UserEntity, CommentEntity])]
})
export class AnswerModule {}

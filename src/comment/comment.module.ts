import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnswerEntity } from '../answer/answer.entity';
import { UserEntity } from '../auth/user.entity';
import { CommentEntity } from './comment.entity';

@Module({
	imports: [TypeOrmModule.forFeature([CommentEntity, UserEntity, AnswerEntity])]
})
export class CommentModule {}

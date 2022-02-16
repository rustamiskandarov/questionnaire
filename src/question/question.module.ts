import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TagEntity } from 'src/tag/tag.entity';
import { QuestionController } from './question.controller';
import { QuestionEntity } from './question.entity';

@Module({
	imports: [TypeOrmModule.forFeature([QuestionEntity, TagEntity])],
  controllers: [QuestionController]
})
export class QuestionModule {}

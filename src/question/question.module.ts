import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { TagEntity } from '../tag/tag.entity';
import { QuestionController } from './question.controller';
import { QuestionEntity } from './question.entity';
import { QuestionService } from './question.service';

@Module({
	imports: [AuthModule, TypeOrmModule.forFeature([QuestionEntity, TagEntity])],
	controllers: [QuestionController],
	providers: [QuestionService]
})
export class QuestionModule { }

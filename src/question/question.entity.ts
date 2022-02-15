import { ApiProperty } from "@nestjs/swagger";
import { QuestionStatusCodeEnum } from "src/enums/question-status-code.enum";
import internal from "stream";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'questions'})
export class QuestionEntity {
	@ApiProperty({ example: '2ee9b1f4-0f19-4d10-aa0a-d265e990c6cb', description: 'UUID вопроса' })
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@ApiProperty({ example: 'Черновик', description: 'Статус вопроса' })
	status: QuestionStatusCodeEnum;

	@ApiProperty({ example: 'Текст заголовка', description: 'Заголовок вопроса' })
	@Column({ type: 'text' })
	title: string;

	@ApiProperty({ example: 'tekst-zagolovka-2342342', description: 'slug вопроса' })
	@Column({ type: 'text' })
	slug: string;

	@ApiProperty({ example: 'Текст тела вопроса', description: 'Текст вопроса' })
	@Column({ type: 'text' })
	body: string;

	//answers: AnswersEntity

	//tags: TagsEntity
	
	@ApiProperty({ example: '999', description: 'Колличество просмотров' })
	@Column({ type: 'number', default: 0 })
	views: number;


	@Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
	createdAt: Date
	@Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
	updateAt: Date
}
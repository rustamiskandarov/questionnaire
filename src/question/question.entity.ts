import { ApiProperty } from "@nestjs/swagger";
<<<<<<< HEAD
import { QuestionStatusCodeEnum } from "../enums/question-status-code.enum";
=======
import { QuestionStatusCodeEnum } from "src/enums/question-status-code.enum";
import { TagEntity } from "src/tag/tag.entity";
>>>>>>> tag-module
import internal from "stream";
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

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
<<<<<<< HEAD

	//tags: TagsEntity

=======
	
	@ApiProperty({ example: 'abc, ddd, xyz', description: 'Теги/метки' })
	@ManyToMany(() => TagEntity, tag => tag.questions, { eager: true })
	tags: TagEntity[]
	
>>>>>>> tag-module
	@ApiProperty({ example: '999', description: 'Колличество просмотров' })
	@Column({ type: 'integer', default: 0 })
	views: number;


	@Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
	createdAt: Date
	@Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
	updateAt: Date
}

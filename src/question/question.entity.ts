import { ApiProperty } from "@nestjs/swagger";
import { QuestionStatusCodeEnum } from "../enums/question-status-code.enum";
import { TagEntity } from "../tag/tag.entity";
import { BeforeUpdate, Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

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

	@ApiProperty({ example: '999', description: 'В избранных' })
	@Column({ default: 0 })
	favoritesCount: number
	//answers: AnswersEntity
	
	@ApiProperty({ example: 'abc, ddd, xyz', description: 'Теги/метки' })
	@ManyToMany(() => TagEntity, tag => tag.questions, { eager: true })
	tags: TagEntity[]
	
	@ApiProperty({ example: '999', description: 'Колличество просмотров' })
	@Column({ type: 'integer', default: 0 })
	views: number;

	@ApiProperty({ example: '2020-02-21', description: 'Дата создания' })
	@Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
	createdAt: Date
	@ApiProperty({ example: '2020-02-21', description: 'Дата изменения' })
	@Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
	updateAt: Date

	@BeforeUpdate()
	updateDate() {
		this.updateAt = new Date();
	}
}

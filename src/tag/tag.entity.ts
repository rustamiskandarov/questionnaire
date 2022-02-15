import { ApiProperty } from "@nestjs/swagger";
import { QuestionEntity } from "src/question/question.entity";
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'tags'})
export class TagEntity{
	@ApiProperty({ example: '2ee9b1f4-0f19-4d10-aa0a-d265e990c6cb', description: 'UUID тега' })
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@ApiProperty({ example: 'tag', description: 'название тега' })
	@Column({type: 'text', nullable: true })
	name: string;

	@ApiProperty({ example: 'описание', description: 'описание тега' })
	@Column({type: 'text', nullable: true })
	description: string;

	@ManyToMany(() => QuestionEntity, question => question.tags)
	questions: QuestionEntity[]
}
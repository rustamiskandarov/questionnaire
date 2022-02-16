import { ApiProperty } from "@nestjs/swagger";
import { UserEntity } from "../auth/user.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { CommentEntity } from "../comment/comment.entity";

@Entity({name: 'answers'})
export class AnswerEntity {
	@ApiProperty({ example: '2ee9b1f4-0f19-4d10-aa0a-d265e990c6cb', description: 'UUID ответа' })
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@ApiProperty({ example: 'Текст ответа', description: 'Текст ответа' })
	@Column({ type: 'text' })
	body: string;

	@ApiProperty({ example: '1', description: 'Колличество голосов' })
	@Column({ type: 'integer', default: 0 })
	voites: number;

	@ApiProperty({ example: 'True', description: 'Лучший ответ' })
	@Column({ type: 'boolean', default: false })
	isBest: boolean;

	@ManyToOne(()=>UserEntity)
	author: UserEntity;

	@OneToMany(()=>CommentEntity, comment => comment.answer)
	comments: CommentEntity[]


	@ApiProperty({ example: '2020-02-21', description: 'Дата создания' })
	@Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
	createdAt: Date
	@ApiProperty({ example: '2020-02-21', description: 'Дата изменения' })
	@Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
	updateAt: Date
}
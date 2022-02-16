import { ApiProperty } from "@nestjs/swagger";
import { UserEntity } from "../auth/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { AnswerEntity } from "../answer/answer.entity";

@Entity({name: 'comments'})
export class CommentEntity {
	@ApiProperty({ example: '2ee9b1f4-0f19-4d10-aa0a-d265e990c6cb', description: 'UUID ответа' })
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@ApiProperty({ example: 'Текст комментария', description: 'Комментарий' })
	@Column({ type: 'text' })
	body: string;


	@ManyToOne(() => UserEntity)
	author: UserEntity;

	@ManyToOne(()=>AnswerEntity)
	answer: AnswerEntity



	@ApiProperty({ example: '2020-02-21', description: 'Дата создания' })
	@Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
	createdAt: Date
	@ApiProperty({ example: '2020-02-21', description: 'Дата изменения' })
	@Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
	updateAt: Date
}
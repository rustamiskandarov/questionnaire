import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from '../auth/user.entity';
import { StatusCodeEnum } from '../enums/status-code.enum';


@Entity({name: 'roles'})
export class RoleEntity {

	@ApiProperty({ example: '2ee9b1f4-0f19-4d10-aa0a-d265e990c6cb', description: 'UUID роли' })
	@PrimaryGeneratedColumn('uuid')
	id: string;
	@Column({nullable:true})
	status: StatusCodeEnum;
	@Column({ type: 'text', unique: true })
	name: string;
	@Column({ type: 'text' , nullable: true})
	description: string;
	@ManyToMany(() => UserEntity)
	@JoinTable()
	users: UserEntity[];
}



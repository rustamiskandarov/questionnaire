import { UserEntity } from '../auth/user.entity';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({name: 'profile'})
export class ProfileEntity {
	@PrimaryGeneratedColumn('uuid')
	id: number;

	@Column('simple-array')
	phone: string;

	@Column({type: 'text'})
	biography: string;

	@Column('simple-array')
	skills: string[];

	@OneToOne(()=>UserEntity)
	user: UserEntity;
}
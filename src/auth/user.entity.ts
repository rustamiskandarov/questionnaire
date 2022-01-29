import { ProfileEntity } from 'src/profile/profile.entity';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'users' })
export class UserEntity {
	@PrimaryGeneratedColumn('uuid')
	id: number;

	@Column({ length: 40, nullable: true })
	firstName: string;

	@Column({ length: 40, nullable: true })
	lastName: string;

	@Column({ length: 40 })
	username: string;

	@Column({ length: 100 })
	email: string;

	@Column({ type: 'boolean', default: true })
	isActive: boolean;

	//role: RoleEntity

	@Column({ type: 'varchar', length: 300 })
	password: string;

	@OneToOne(()=>ProfileEntity)
	profile: ProfileEntity;







}
import { ProfileEntity } from 'src/profile/profile.entity';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn, ManyToMany, JoinTable} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { RoleEntity } from 'src/role/role.entity';

@Entity({ name: 'users' })
export class UserEntity {
	@ApiProperty({ example: '2ee9b1f4-0f19-4d10-aa0a-d265e990c6cb', description: 'UUID пользователя'})
	@PrimaryGeneratedColumn('uuid')
	id: number;

	@ApiProperty({ example: 'Иван', description: 'Имя пользователя' })
	@Column({ length: 40, nullable: true })
	firstName: string;

	@ApiProperty({ example: 'Иванов', description: 'Фамилия пользователя' })
	@Column({ length: 40, nullable: true })
	lastName: string;

	@ApiProperty({ example: 'Ivanov1999666', description: 'Логин пользователя' })
	@Column({ length: 40 , unique: true})
	username: string;

	@ApiProperty({ example: 'example-email@email.em', description: 'Эл.почта пользователя' })
	@Column({ length: 100 })
	email: string;

	@ApiProperty({ example: 'True', description: 'Активен ли пользователь' })
	@Column({ type: 'boolean', default: true })
	isActive: boolean;

	@ApiProperty({description: 'Причина блокировки пользователя'})
	@Column({ length: 250, nullable: true })
	blockedReason: string;

	@ManyToMany(()=>RoleEntity, role=>role.users, {eager: true})
	@JoinTable()
	roles: RoleEntity[];

	@ApiProperty({ example: 'password', description: 'Пароль пользователя' })
	@Column({ select:false, type: 'varchar', length: 300})
	password: string;

	//@ApiProperty({ example: 'Профиль', description: 'Профиль пользователя' })
	@OneToOne(()=>ProfileEntity)
	profile: ProfileEntity;

	@Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
	createdAt: Date
	@Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
	updateAt: Date





}


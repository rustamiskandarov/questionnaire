import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleEntity } from './role.entity';
import { RoleController } from './role.controller';


@Module({
	imports: [TypeOrmModule.forFeature([RoleEntity])],
	controllers: [RoleController],
})
export class RoleModule {
	
}

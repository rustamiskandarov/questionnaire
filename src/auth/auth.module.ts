import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleEntity } from '../role/role.entity';
import { RoleModule } from '../role/role.module';
import { ProfileEntity } from '../profile/profile.entity';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserEntity } from './user.entity';


@Module({
  imports: [RoleModule, TypeOrmModule.forFeature([UserEntity, ProfileEntity, RoleEntity]),
//   JwtModule.register({
// 	  secret: process.env.JWT_SECRET || 'SECRET',
// 	//   signOptions: {
// 	// 	  expiresIn: '24h'
// 	//   }
//   })
],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [
	  //JwtModule, 
	  AuthService]
})

export class AuthModule {

}

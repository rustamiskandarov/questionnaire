import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfileEntity } from '../profile/profile.entity';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserEntity } from './user.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, ProfileEntity]),
  JwtModule.register({
	  secret: process.env.JWT_SECRET || 'SECRET',
	  signOptions: {
		  expiresIn: '24h'
	  }
  })
],
  controllers: [AuthController],
  providers: [AuthService],
  exports: []
})

export class AuthModule {

}

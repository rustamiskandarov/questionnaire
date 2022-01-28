import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import dbconfig from './config/ormconfig';

@Module({
  imports: [
	TypeOrmModule.forRoot(dbconfig),
	AuthModule
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

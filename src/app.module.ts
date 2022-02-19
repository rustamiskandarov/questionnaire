import { TypeOrmModule } from '@nestjs/typeorm';
import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { ProfileModule } from './profile/profile.module';
import { ConfigModule } from '@nestjs/config';
import { CurrentUserMiddleware } from './middleware/current-user.middleware';
import { RoleModule } from './role/role.module';

import { UserEntity } from './auth/user.entity';
import { ProfileEntity } from './profile/profile.entity';
import { RoleEntity } from './role/role.entity';
import { QuestionModule } from './question/question.module';
import { TagModule } from './tag/tag.module';
import { AnswerModule } from './answer/answer.module';
import { CommentModule } from './comment/comment.module';
import { FileModule } from './file/file.module';
import ormconfig from './ormconfig';
@Module({
	imports: [
		ConfigModule.forRoot({
			envFilePath: '.env'
		}),
		TypeOrmModule.forRoot(
			ormconfig
			// {
			// 	// type: 'postgres',
			// 	// host: process.env.POSTGRES_HOST,
			// 	// port: Number(process.env.POSTGRES_PORT),
			// 	// username: process.env.POSTGRES_USER,
			// 	// password: process.env.POSTGRES_PASSWORD,
			// 	// database: process.env.POSTGRES_DATABASE,
			// 	type: 'postgres',
			// 	host: '127.0.0.1',
			// 	port: 5432,
			// 	username: 'questionnaire',
			// 	password: '123456',
			// 	database: 'questionnaire',
			// 	entities: [__dirname + '/**/*.entity{.ts,.js}'],
			// 	//entities: [UserEntity, ProfileEntity,RoleEntity],
			// 	synchronize: false,
			// 	migrations: [
			// 		__dirname + '/migrations/**/*{.ts,.js}'
			// 	],
			// 	migrationsTableName: 'migrations',
			// 	ssl: false,
			// 	cli: {
			// 		migrationsDir: 'src/migrations',
			// 	},
			// }
		),
		AuthModule,
		ProfileModule,
		RoleModule,
		QuestionModule,
		TagModule,
		AnswerModule,
		CommentModule,
		FileModule
	],
	controllers: [AppController],
})
export class AppModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(CurrentUserMiddleware).forRoutes({
			path: '*',
			method: RequestMethod.ALL,
		});
	}

}

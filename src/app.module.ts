import { TypeOrmModule } from '@nestjs/typeorm';
import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ProfileModule } from './profile/profile.module';
import { ConfigModule } from '@nestjs/config';
import { CurrentUserMiddleware } from './middleware/current-user.middleware';
@Module({
	imports: [
		ConfigModule.forRoot({
			envFilePath: '.env'
		}),
		TypeOrmModule.forRoot(
			{
				type: 'postgres',
				host: process.env.POSTGRES_HOST,
				port: Number(process.env.POSTGRES_PORT),
				username: process.env.POSTGRES_USER,
				password: process.env.POSTGRES_PASSWORD,
				database: process.env.POSTGRES_DATABASE,
				entities: [__dirname + '/**/*.entity{.ts,.js}'],
				synchronize: false,
				migrations: [
					__dirname + '/migrations/**/*{.ts,.js}'
				],
				migrationsTableName: 'migrations',
				ssl: false
			}
		),
		AuthModule,
		ProfileModule
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(CurrentUserMiddleware).forRoutes({
			path: '*',
			method: RequestMethod.ALL,
		});
	}

}

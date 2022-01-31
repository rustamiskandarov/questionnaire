import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { configService } from './config/config.service';

async function bootstrap() {
	const app = await NestFactory.create(AppModule, { cors: true });
	
	if(!configService.isProduction()){
		const config = new DocumentBuilder()
			.setTitle('Questionnaire')
			.setDescription('REST api documentation')
			.setVersion('1.0.0')
			.addTag('Test')
			.build();
		const document = SwaggerModule.createDocument(app, config);
		SwaggerModule.setup('/api/docs', app, document);
	}

	

	

	await app.listen(process.env.PORT || 5000);
}
bootstrap();

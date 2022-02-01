import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
	const app = await NestFactory.create(AppModule, { cors: true });
	
	if (process.env.MODE=='prod'){
		const config = new DocumentBuilder()
			.setTitle('Questionnaire')
			.setDescription('REST api documentation')
			.setVersion('1.0.0')
			.addTag('Test')
			.build();
		const document = SwaggerModule.createDocument(app, config);
		SwaggerModule.setup('/api/docs', app, document);
	}

	await app.listen(process.env.PORT||5000, ()=>{
		console.log(`Server api is running on port: ${process.env.PORT}, mode: ${ process.env.NODE_ENV}`);
	});
}
bootstrap();

import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { UserSignUpDto } from '../src/auth/dto/user.signup.dto';
import { ACCESS_DENIED_ERROR, EMAIL_IS_BUSY_ERROR, NAME_IS_BUSY_ERROR, USERNAME_IS_BUSY_ERROR, USER_NOT_FOUND_ERROR, WRONG_LOGIN_AND_PASSWORD_ERROR } from '../src/exeptions-consts';
import { CreateQuestionDto } from '../src/question/dto/create-question.dto';

const createUserDto: UserSignUpDto = {
	username: 'testUser1111',
	email: 'testUser1111@fsdjh8f8jf1.df',
	password: '123eeeeee'
}

const createQuestionDto: CreateQuestionDto = {
	title: 'тестовый вопрос',
	body: 'текст тестового вопроса',
	tagList: ['Tag1', 'Tag2']
}


describe('QuestionController (e2e)', () => {
	let app: INestApplication;
	let slug: string;
	const adminToken = process.env.ADMIN_TOKEN
	let userToken: string;

	beforeAll(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [AppModule],
		}).compile();

		app = moduleFixture.createNestApplication();
		await app.init();
		const { body } = await request(app.getHttpServer())
			.post('/auth/signup/')
			.send(createUserDto);
		userToken = body.user.token;
	});

	it('question/ (POST) - success', () => {
		return request(app.getHttpServer())
			.post('/question/')
			.set('Authorization',userToken)
			.send(createQuestionDto)
			.expect(201)
			.then(({ body }: request.Response) => {
				expect(body.question.title).toBe(createQuestionDto.title);
				slug = body.question.slug
			});
	});


	// it('auth/login/ (POST) - success', () => {
	// 	return request(app.getHttpServer())
	// 		.post('/auth/login/')
	// 		.send(createUserDto)
	// 		.expect(201)
	// 		.then(({ body }: request.Response) => {
	// 			expect(body.user.token).toBeDefined();
	// 			token = body.user.token;
	// 			username = body.user.username;
	// 		})
	// 		;
	// });


	// it('tag (GET) - success', () => {
	// 	return request(app.getHttpServer())
	// 		.get('/tag')
	// 		.expect(200)
	// 		.then(({ body }: request.Response) => {
	// 			body.tags.forEach(el => {
	// 				if (el == createTagDto.name) {
	// 					expect(el).toContain(createTagDto.name);
	// 				}
	// 			});

	// 		})
	// });



	// it('/tag/:slug (DELETE) - fail (access denaied)', () => {
	// 	return request(app.getHttpServer())
	// 		.delete('/tag/' + slug)
	// 		.expect(403, {
	// 			errors: ACCESS_DENIED_ERROR
	// 		});
	// });


	it('/question/:slug (DELETE) - success', () => {
		return request(app.getHttpServer())
			.delete('/question/' + slug)
			.set('Authorization', userToken)
			.expect(200)
			.then(({ body }: request.Response) => {
				expect(body.affected).toBe(1);
			});
	});
	afterAll(async () => {
		await app.close();
	});
});

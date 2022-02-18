import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { UserSignUpDto } from '../src/auth/dto/user.signup.dto';
import { ACCESS_DENIED_ERROR, EMAIL_IS_BUSY_ERROR, NAME_IS_BUSY_ERROR, USERNAME_IS_BUSY_ERROR, USER_NOT_FOUND_ERROR, WRONG_LOGIN_AND_PASSWORD_ERROR } from '../src/exeptions-consts';
import { TagDto } from '../src/tag/dto/tag.dto';


const createTagDto: TagDto = {
	name: 'tag89999',
	description: 'description from tag 1'
}


describe('TagController (e2e)', () => {
	let app: INestApplication;
	let slug: string;
	const adminToken = process.env.ADMIN_TOKEN

	beforeAll(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [AppModule],
		}).compile();

		app = moduleFixture.createNestApplication();
		await app.init();
	});

	it('tag/ (POST) - success', () => {
		return request(app.getHttpServer())
			.post('/tag/')
			.send(createTagDto)
			.expect(201)
			.then(({ body }: request.Response) => {
				expect(body.tag.name).toBe(createTagDto.name);
				slug = body.tag.slug
			});
	});

	it('/tag/ (POST) - fail (повтор названия тега)', () => {
		return request(app.getHttpServer())
			.post('/tag/')
			.send(createTagDto)
			.expect(400, {
				errors: {
					name: NAME_IS_BUSY_ERROR,
				}
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


	it('tag (GET) - success', () => {
		return request(app.getHttpServer())
			.get('/tag')
			.expect(200)
			.then(({ body }: request.Response) => {
				body.tags.forEach(el => {
					if (el == createTagDto.name) {
						expect(el).toContain(createTagDto.name);
					}
				});

			})
	});



	it('/tag/:slug (DELETE) - fail (access denaied)', () => {
		return request(app.getHttpServer())
			.delete('/tag/' + slug)
			.expect(403, {
				errors: ACCESS_DENIED_ERROR
			});
	});


	it('/tag/:slug (DELETE) - success', () => {
		return request(app.getHttpServer())
			.delete('/tag/' + slug)
			.set('Authorization', 'Bearer ' + adminToken)
			.expect(200)
			.then(({ body }: request.Response) => {
				expect(body.affected).toBe(1);
			});
	});
	afterAll(async () => {
		await app.close();
	});
});

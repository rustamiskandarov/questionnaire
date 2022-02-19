import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { UserSignUpDto } from '../src/auth/dto/user.signup.dto';
import { EMAIL_IS_BUSY_ERROR, USERNAME_IS_BUSY_ERROR, USER_NOT_FOUND_ERROR, WRONG_LOGIN_AND_PASSWORD_ERROR } from '../src/exeptions-consts';


const createUserDto: UserSignUpDto = {
	username: 'user1119999999999',
	email: 'user111@fsdjh8f8jf1.df',
	password: '123eeeeee'
};


describe('AuthController (e2e)', () => {
	let app: INestApplication;
	let token: string;
	let username: string;
	const adminToken = process.env.ADMIN_TOKEN;

	beforeAll(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [AppModule],
		}).compile();

		app = moduleFixture.createNestApplication();
		await app.init();
	});

	it('auth/signup/ (POST) - success', () => {
		return request(app.getHttpServer())
			.post('/auth/signup/')
			.send(createUserDto)
			.expect(201)
			.then(({ body }: request.Response) => {
				expect(body.user.token).toBeDefined();
			});
	});

	it('auth/signup/ (POST) - fail (логин или пароль используеться)', () => {
		return request(app.getHttpServer())
			.post('/auth/signup/')
			.send(createUserDto)
			.expect(422, {
				errors: {
					email: EMAIL_IS_BUSY_ERROR,
					username: USERNAME_IS_BUSY_ERROR
				}
			});
	});

	it('auth/login/ (POST) - success', () => {
		return request(app.getHttpServer())
			.post('/auth/login/')
			.send(createUserDto)
			.expect(201)
			.then(({ body }: request.Response) => {
				expect(body.user.token).toBeDefined();
				token = body.user.token;
				username = body.user.username;
			})
			;
	});
	it('auth/login/ (POST) - fail (wrong password or login)', () => {
		return request(app.getHttpServer())
			.post('/auth/login/')
			.send({ ...createUserDto, password: '1!@#%$^%*&' })
			.expect(401, {
				errors: {
					'email or password': WRONG_LOGIN_AND_PASSWORD_ERROR
				}
			});
	});
	it('users/username/addRoles (PUT) - fail (role not found)', () => {
		return request(app.getHttpServer())
			.put('/users/' + username + '/addRoles')
			.set('Authorization', 'Bearer ' + adminToken)
			.send({
				roles: [
					'#$$#$@#$%$$#'
				]
			})
			.expect(200)
			.then(({ body }: request.Response) => {
				expect(body.user.roles).toHaveLength(0);
			})
			;
	});
	it('users/username/addRoles (PUT) - success', () => {
		return request(app.getHttpServer())
			.put('/users/' + username + '/addRoles')
			.set('Authorization', 'Bearer ' + adminToken)
			.send({
				roles: [
					'UManager'
				]
			})
			.expect(200)
			.then(({ body }: request.Response) => {
				expect(body.user.roles[0].name).toContain('UManager');
			})
			;
	});
	it('users/username/addRoles (PUT) - fail (user not found)', () => {
		return request(app.getHttpServer())
			.put('/users/' + username + 111111111 + '/addRoles')
			.set('Authorization', 'Bearer ' + adminToken)
			.send({
				roles: [
					'UManager'
				]
			})
			.expect(404, {
				errors: {
					'user': USER_NOT_FOUND_ERROR
				}
			});
	});

	it('users/username/block (PUT) - fail (user not found)', () => {
		return request(app.getHttpServer())
			.put('/users/' + username + 11111111111111111 + '/block')
			.set('Authorization', 'Bearer ' + adminToken)
			.send({
				'reason': 'ban'
			})
			.expect(404, {
				errors: {
					'user': USER_NOT_FOUND_ERROR
				}
			})
			;
	});

	it('users/username/block (PUT) - success', () => {
		return request(app.getHttpServer())
			.put('/users/' + username + '/block')
			.set('Authorization', 'Bearer ' + adminToken)
			.send({
				'reason': 'ban'
			})
			.expect(200)
			.then(({ body }: request.Response) => {
				expect(body.user.isActive).toBe(false);
				expect(body.user.blockedReason).toBe('ban');
			})
			;
	});


	it('users/username/unlock (PUT) - fail (user not found)', () => {
		return request(app.getHttpServer())
			.put('/users/' + username + 1111111 + '/unlock')
			.set('Authorization', 'Bearer ' + adminToken)
			.expect(404, {
				errors: {
					'user': USER_NOT_FOUND_ERROR
				}
			})
	});

	it('users/username/unlock (PUT) - success', () => {
		return request(app.getHttpServer())
			.put('/users/' + username + '/unlock')
			.set('Authorization', 'Bearer ' + adminToken)
			.expect(200)
			.then(({ body }: request.Response) => {
				expect(body.user.isActive).toBe(true);
				expect(body.user.blockedReason).toEqual('');
			})
			;
	});


	it('users (GET) - success', () => {
		return request(app.getHttpServer())
			.get('/users')
			.set('Authorization', 'Bearer ' + adminToken)
			.expect(200)
			.then(({ body }: request.Response) => {
				body.users.forEach(el => {
					if (el.username == username) {
						expect(el.username).toContain(username);
					} else {
						expect(body.users[0].username).toContain(username);
					}
				});

			})
	});



	it('/users/:username (DELETE) - success', () => {
		return request(app.getHttpServer())
			.delete('/users/' + username)
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

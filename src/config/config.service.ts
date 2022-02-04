import { TypeOrmModuleOptions } from '@nestjs/typeorm';

// tslint:disable-next-line: no-var-requires
require('dotenv').config();

class ConfigService {

	constructor(private env: { [k: string]: string | undefined }) { }

	private getValue(key: string, throwOnMissing = true): string {
		const value = this.env[key];
		if (!value && throwOnMissing) {
			throw new Error(`config error - missing env.${key}`);
		}

		return value;
	}

	public ensureValues(keys: string[]) {
	
		keys.forEach(k => this.getValue(k, true));
		return this;
	}

	public getPort() {
		return this.getValue('PORT', true);
	}

	public getTypeOrmConfig(): TypeOrmModuleOptions {
	
		return {
			type: 'postgres',

			// host: this.getValue('POSTGRES_HOST'),
			// port: parseInt(this.getValue('POSTGRES_PORT')),
			// username: this.getValue('POSTGRES_USER'),
			// password: this.getValue('POSTGRES_PASSWORD'),
			// database: this.getValue('POSTGRES_DATABASE'),

			host: process.env.POSTGRES_HOST,
			port: Number(process.env.POSTGRES_PORT),
			username: process.env.POSTGRES_USER,
			password: process.env.POSTGRES_PASSWORD,
			database: process.env.POSTGRES_DATABASE,

			entities: [__dirname + '/**/*.entity{.ts,.js}'],
			synchronize: false,
			migrations: ['src/migrations/*.ts'],
			cli: {
				migrationsDir: 'src/migrations',
			},
			migrationsTableName: 'migrations',

			//ssl: this.isProduction(),
		};
	}

}

const configService = new ConfigService(process.env)
	.ensureValues([
		'POSTGRES_HOST',
		'POSTGRES_PORT',
		'POSTGRES_USER',
		'POSTGRES_PASSWORD',
		'POSTGRES_DATABASE'
	]);

export { configService };
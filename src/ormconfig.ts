import { ConnectionOptions } from 'typeorm';

const dbconfig: ConnectionOptions = {
	type: 'postgres',
	host: '127.0.0.1',
	port: 5432,
	username: 'questionnaire',
	password: '123456',
	database: 'questionnaire',
	// host: process.env.POSTGRES_HOST,
	// port: Number(process.env.POSTGRES_PORT),
	// username: process.env.POSTGRES_USER,
	// password: process.env.POSTGRES_PASSWORD,
	// database: process.env.POSTGRES_DATABASE,
	entities: [__dirname + '/**/*.entity{.ts,.js}'],
	synchronize: false,
	migrations: [
		__dirname + '/migrations/**/*{.ts,.js}'
	],
	migrationsTableName: 'migrations',
	cli: {
		migrationsDir: 'src/migrations',
	},
	ssl: false
};

export default dbconfig;
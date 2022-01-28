import { ConnectionOptions } from 'typeorm';

const dbconfig: ConnectionOptions = {
	type: 'postgres',
	host: 'localhost',
	port: 5432,
	username: 'questionnare',
	password: '123456',
	database: 'questionnare',
	entities: [__dirname + '/**/*.entity{.ts,.js}'],
	synchronize: false,
	migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
	cli: {
		migrationsDir: 'src/migrations',
	},
};

export default dbconfig;
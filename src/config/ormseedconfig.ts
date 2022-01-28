import { ConnectionOptions } from 'typeorm';
import dbconfig from './ormconfig';



const seedConfig: ConnectionOptions = {
	...dbconfig,
	migrations: [__dirname + '/seeds/**/*{.ts, .js}'],
	cli: {
		migrationsDir: 'src/seeds'
	}
};

export default seedConfig;
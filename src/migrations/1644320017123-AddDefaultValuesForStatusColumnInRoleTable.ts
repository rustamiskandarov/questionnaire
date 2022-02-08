import {MigrationInterface, QueryRunner} from "typeorm";

export class AddDefaultValuesForStatusColumnInRoleTable1644320017123 implements MigrationInterface {
    name = 'AddDefaultValuesForStatusColumnInRoleTable1644320017123'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "roles" ALTER COLUMN "status" SET DEFAULT '2'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "roles" ALTER COLUMN "status" DROP DEFAULT`);
    }

}

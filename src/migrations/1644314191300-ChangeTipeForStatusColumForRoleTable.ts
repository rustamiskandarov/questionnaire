import {MigrationInterface, QueryRunner} from "typeorm";

export class ChangeTipeForStatusColumForRoleTable1644314191300 implements MigrationInterface {
    name = 'ChangeTipeForStatusColumForRoleTable1644314191300'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "roles" DROP COLUMN "status"`);
        await queryRunner.query(`ALTER TABLE "roles" ADD "status" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "roles" DROP COLUMN "status"`);
        await queryRunner.query(`ALTER TABLE "roles" ADD "status" text NOT NULL`);
    }

}

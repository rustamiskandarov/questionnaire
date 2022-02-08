import {MigrationInterface, QueryRunner} from "typeorm";

export class AddStatusColumtForRoleTable1644312910382 implements MigrationInterface {
    name = 'AddStatusColumtForRoleTable1644312910382'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "roles" ADD "status" text NOT NULL`);
        await queryRunner.query(`ALTER TABLE "roles" ADD CONSTRAINT "UQ_648e3f5447f725579d7d4ffdfb7" UNIQUE ("name")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "roles" DROP CONSTRAINT "UQ_648e3f5447f725579d7d4ffdfb7"`);
        await queryRunner.query(`ALTER TABLE "roles" DROP COLUMN "status"`);
    }

}

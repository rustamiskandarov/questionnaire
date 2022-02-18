import {MigrationInterface, QueryRunner} from "typeorm";

export class AddSlugColumnInTagTable1645000441931 implements MigrationInterface {
    name = 'AddSlugColumnInTagTable1645000441931'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tags" ADD "slug" text NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tags" ADD CONSTRAINT "UQ_b3aa10c29ea4e61a830362bd25a" UNIQUE ("slug")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tags" DROP CONSTRAINT "UQ_b3aa10c29ea4e61a830362bd25a"`);
        await queryRunner.query(`ALTER TABLE "tags" DROP COLUMN "slug"`);
    }

}

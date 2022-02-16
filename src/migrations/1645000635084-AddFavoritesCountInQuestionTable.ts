import {MigrationInterface, QueryRunner} from "typeorm";

export class AddFavoritesCountInQuestionTable1645000635084 implements MigrationInterface {
    name = 'AddFavoritesCountInQuestionTable1645000635084'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "questions" ADD "favoritesCount" integer NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "questions" DROP COLUMN "favoritesCount"`);
    }

}

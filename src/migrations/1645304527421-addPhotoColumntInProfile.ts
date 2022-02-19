import {MigrationInterface, QueryRunner} from "typeorm";

export class addPhotoColumntInProfile1645304527421 implements MigrationInterface {
    name = 'addPhotoColumntInProfile1645304527421'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "profiles" ADD "photo" text NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "profiles" DROP COLUMN "photo"`);
    }

}

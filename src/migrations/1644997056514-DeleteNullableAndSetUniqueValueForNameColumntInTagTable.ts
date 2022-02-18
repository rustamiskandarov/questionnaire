import {MigrationInterface, QueryRunner} from "typeorm";

export class DeleteNullableAndSetUniqueValueForNameColumntInTagTable1644997056514 implements MigrationInterface {
    name = 'DeleteNullableAndSetUniqueValueForNameColumntInTagTable1644997056514'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tags" ALTER COLUMN "name" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tags" ADD CONSTRAINT "UQ_d90243459a697eadb8ad56e9092" UNIQUE ("name")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tags" DROP CONSTRAINT "UQ_d90243459a697eadb8ad56e9092"`);
        await queryRunner.query(`ALTER TABLE "tags" ALTER COLUMN "name" DROP NOT NULL`);
    }

}

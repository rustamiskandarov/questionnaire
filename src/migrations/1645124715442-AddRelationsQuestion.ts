import {MigrationInterface, QueryRunner} from "typeorm";

export class AddRelationsQuestion1645124715442 implements MigrationInterface {
    name = 'AddRelationsQuestion1645124715442'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "questions" ADD "authorId" uuid`);
        await queryRunner.query(`ALTER TABLE "questions" ADD CONSTRAINT "FK_ca251175a93ed97051be0df6e6f" FOREIGN KEY ("authorId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "questions" DROP CONSTRAINT "FK_ca251175a93ed97051be0df6e6f"`);
        await queryRunner.query(`ALTER TABLE "questions" DROP COLUMN "authorId"`);
    }

}

import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateUserAndProfileTable1643479881013 implements MigrationInterface {
    name = 'CreateUserAndProfileTable1643479881013'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "firstName" character varying(40), "lastName" character varying(40), "username" character varying(40) NOT NULL, "email" character varying(100) NOT NULL, "isActive" boolean NOT NULL DEFAULT true, "password" character varying(300) NOT NULL, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "profile" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "phone" text NOT NULL, "biography" text NOT NULL, "skills" text NOT NULL, CONSTRAINT "PK_3dd8bfc97e4a77c70971591bdcb" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "profile"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}

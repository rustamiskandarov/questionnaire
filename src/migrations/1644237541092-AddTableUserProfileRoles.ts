import {MigrationInterface, QueryRunner} from "typeorm";

export class AddTableUserProfileRoles1644237541092 implements MigrationInterface {
    name = 'AddTableUserProfileRoles1644237541092'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "profiles" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "phone" text NOT NULL, "biography" text NOT NULL, "skills" text NOT NULL, CONSTRAINT "PK_8e520eb4da7dc01d0e190447c8e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "roles" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" text NOT NULL, "description" text NOT NULL, CONSTRAINT "PK_c1433d71a4838793a49dcad46ab" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "firstName" character varying(40), "lastName" character varying(40), "username" character varying(40) NOT NULL, "email" character varying(100) NOT NULL, "isActive" boolean NOT NULL DEFAULT true, "password" character varying(300) NOT NULL, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "roles_users_users" ("rolesId" uuid NOT NULL, "usersId" uuid NOT NULL, CONSTRAINT "PK_d9b9cca39b8cc7e99072274dafa" PRIMARY KEY ("rolesId", "usersId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_6baa1fce24dde516186c4f0269" ON "roles_users_users" ("rolesId") `);
        await queryRunner.query(`CREATE INDEX "IDX_391282056f6da8665b38480a13" ON "roles_users_users" ("usersId") `);
        await queryRunner.query(`CREATE TABLE "users_roles_roles" ("usersId" uuid NOT NULL, "rolesId" uuid NOT NULL, CONSTRAINT "PK_6c1a055682c229f5a865f2080c1" PRIMARY KEY ("usersId", "rolesId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_df951a64f09865171d2d7a502b" ON "users_roles_roles" ("usersId") `);
        await queryRunner.query(`CREATE INDEX "IDX_b2f0366aa9349789527e0c36d9" ON "users_roles_roles" ("rolesId") `);
        await queryRunner.query(`ALTER TABLE "roles_users_users" ADD CONSTRAINT "FK_6baa1fce24dde516186c4f0269a" FOREIGN KEY ("rolesId") REFERENCES "roles"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "roles_users_users" ADD CONSTRAINT "FK_391282056f6da8665b38480a131" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users_roles_roles" ADD CONSTRAINT "FK_df951a64f09865171d2d7a502b1" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "users_roles_roles" ADD CONSTRAINT "FK_b2f0366aa9349789527e0c36d97" FOREIGN KEY ("rolesId") REFERENCES "roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users_roles_roles" DROP CONSTRAINT "FK_b2f0366aa9349789527e0c36d97"`);
        await queryRunner.query(`ALTER TABLE "users_roles_roles" DROP CONSTRAINT "FK_df951a64f09865171d2d7a502b1"`);
        await queryRunner.query(`ALTER TABLE "roles_users_users" DROP CONSTRAINT "FK_391282056f6da8665b38480a131"`);
        await queryRunner.query(`ALTER TABLE "roles_users_users" DROP CONSTRAINT "FK_6baa1fce24dde516186c4f0269a"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_b2f0366aa9349789527e0c36d9"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_df951a64f09865171d2d7a502b"`);
        await queryRunner.query(`DROP TABLE "users_roles_roles"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_391282056f6da8665b38480a13"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_6baa1fce24dde516186c4f0269"`);
        await queryRunner.query(`DROP TABLE "roles_users_users"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "roles"`);
        await queryRunner.query(`DROP TABLE "profiles"`);
    }

}

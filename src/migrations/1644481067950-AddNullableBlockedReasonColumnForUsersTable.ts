import {MigrationInterface, QueryRunner} from "typeorm";

export class AddNullableBlockedReasonColumnForUsersTable1644481067950 implements MigrationInterface {
    name = 'AddNullableBlockedReasonColumnForUsersTable1644481067950'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "blockedReason" character varying(250)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "blockedReason"`);
    }

}

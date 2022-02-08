import {MigrationInterface, QueryRunner} from "typeorm";

export class AddNullableValueDescriptionColumnInRoleTable1644325571943 implements MigrationInterface {
    name = 'AddNullableValueDescriptionColumnInRoleTable1644325571943'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "roles" ALTER COLUMN "status" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "roles" ALTER COLUMN "description" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "roles" ALTER COLUMN "description" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "roles" ALTER COLUMN "status" SET NOT NULL`);
    }

}

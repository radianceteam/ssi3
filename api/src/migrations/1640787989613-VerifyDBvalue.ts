import {MigrationInterface, QueryRunner} from "typeorm";

export class VerifyDBvalue1640787989613 implements MigrationInterface {
    name = 'VerifyDBvalue1640787989613'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "verifyDB" ADD "value" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "verifyDB" DROP COLUMN "value"`);
    }

}

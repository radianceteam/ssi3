import {MigrationInterface, QueryRunner} from "typeorm";

export class VerifyDB1640744165928 implements MigrationInterface {
    name = 'VerifyDB1640744165928'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "verifyDB" ("id" SERIAL NOT NULL, "did" character varying NOT NULL, CONSTRAINT "PK_38b844c6343a9ec8754c3c896fe" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "verifyDB"`);
    }

}

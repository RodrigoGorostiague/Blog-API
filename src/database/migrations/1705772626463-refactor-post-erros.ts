import { MigrationInterface, QueryRunner } from "typeorm";

export class RefactorPostErros1705772626463 implements MigrationInterface {
    name = 'RefactorPostErros1705772626463'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "posts" DROP CONSTRAINT "UQ_8c59eff563e1375dfbbb311765f"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "posts" ADD CONSTRAINT "UQ_8c59eff563e1375dfbbb311765f" UNIQUE ("img")`);
    }

}

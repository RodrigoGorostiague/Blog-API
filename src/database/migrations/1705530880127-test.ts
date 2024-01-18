import { MigrationInterface, QueryRunner } from 'typeorm';

export class Test1705530880127 implements MigrationInterface {
  name = 'Test1705530880127';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "posts" ADD CONSTRAINT "UQ_8c59eff563e1375dfbbb311765f" UNIQUE ("img")`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "posts" DROP CONSTRAINT "UQ_8c59eff563e1375dfbbb311765f"`,
    );
  }
}

import { MigrationInterface, QueryRunner } from 'typeorm';

export class RefactorRelations1705767700918 implements MigrationInterface {
  name = 'RefactorRelations1705767700918';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "timelines" ALTER COLUMN "img" DROP NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "timelines" ALTER COLUMN "img" SET NOT NULL`,
    );
  }
}

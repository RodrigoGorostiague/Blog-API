import { MigrationInterface, QueryRunner } from 'typeorm';

export class RefactorTagId1705766366483 implements MigrationInterface {
  name = 'RefactorTagId1705766366483';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "tags" DROP CONSTRAINT "FK_802d7528164904a380831ebdaa4"`,
    );
    await queryRunner.query(`ALTER TABLE "tags" DROP COLUMN "timelineId"`);
    await queryRunner.query(`ALTER TABLE "timelines" ADD "tagsId" integer`);
    await queryRunner.query(
      `ALTER TABLE "timelines" ADD CONSTRAINT "FK_83d1da546cc45129d6ef7267596" FOREIGN KEY ("tagsId") REFERENCES "tags"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "timelines" DROP CONSTRAINT "FK_83d1da546cc45129d6ef7267596"`,
    );
    await queryRunner.query(`ALTER TABLE "timelines" DROP COLUMN "tagsId"`);
    await queryRunner.query(`ALTER TABLE "tags" ADD "timelineId" bigint`);
    await queryRunner.query(
      `ALTER TABLE "tags" ADD CONSTRAINT "FK_802d7528164904a380831ebdaa4" FOREIGN KEY ("timelineId") REFERENCES "timelines"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}

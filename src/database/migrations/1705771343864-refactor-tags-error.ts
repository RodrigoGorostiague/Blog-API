import { MigrationInterface, QueryRunner } from "typeorm";

export class RefactorTagsError1705771343864 implements MigrationInterface {
    name = 'RefactorTagsError1705771343864'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "timelines" DROP CONSTRAINT "FK_83d1da546cc45129d6ef7267596"`);
        await queryRunner.query(`CREATE TABLE "timelines_tags_tags" ("timelinesId" bigint NOT NULL, "tagsId" integer NOT NULL, CONSTRAINT "PK_d6ea853cdd1661993449b5814b7" PRIMARY KEY ("timelinesId", "tagsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_df350c6d8d0b57206753f0bba0" ON "timelines_tags_tags" ("timelinesId") `);
        await queryRunner.query(`CREATE INDEX "IDX_0b2953cb2919e14f73919b1bfe" ON "timelines_tags_tags" ("tagsId") `);
        await queryRunner.query(`ALTER TABLE "timelines" DROP COLUMN "tagsId"`);
        await queryRunner.query(`ALTER TABLE "timelines_tags_tags" ADD CONSTRAINT "FK_df350c6d8d0b57206753f0bba07" FOREIGN KEY ("timelinesId") REFERENCES "timelines"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "timelines_tags_tags" ADD CONSTRAINT "FK_0b2953cb2919e14f73919b1bfe0" FOREIGN KEY ("tagsId") REFERENCES "tags"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "timelines_tags_tags" DROP CONSTRAINT "FK_0b2953cb2919e14f73919b1bfe0"`);
        await queryRunner.query(`ALTER TABLE "timelines_tags_tags" DROP CONSTRAINT "FK_df350c6d8d0b57206753f0bba07"`);
        await queryRunner.query(`ALTER TABLE "timelines" ADD "tagsId" integer`);
        await queryRunner.query(`DROP INDEX "public"."IDX_0b2953cb2919e14f73919b1bfe"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_df350c6d8d0b57206753f0bba0"`);
        await queryRunner.query(`DROP TABLE "timelines_tags_tags"`);
        await queryRunner.query(`ALTER TABLE "timelines" ADD CONSTRAINT "FK_83d1da546cc45129d6ef7267596" FOREIGN KEY ("tagsId") REFERENCES "tags"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}

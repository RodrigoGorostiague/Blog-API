import { MigrationInterface, QueryRunner } from 'typeorm';

export class Init1705784791721 implements MigrationInterface {
  name = 'Init1705784791721';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "posts" ("id" BIGSERIAL NOT NULL, "create_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "title" character varying(255) NOT NULL, "content" text NOT NULL, "update_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "img" character varying(255) NOT NULL, "author_id" integer, CONSTRAINT "PK_2829ac61eff60fcec60d7274b9e" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "reply" ("id" BIGSERIAL NOT NULL, "create_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "content" text NOT NULL, "title" character varying(255) NOT NULL, "update_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "img" character varying(255) NOT NULL, "author_id" integer, "post_id" bigint, CONSTRAINT "PK_94fa9017051b40a71e000a2aff9" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "tags" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "description" character varying(255) NOT NULL, CONSTRAINT "PK_e7dc17249a1148a1970748eda99" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "timelines" ("id" BIGSERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "title" character varying(255) NOT NULL, "content" text NOT NULL, "img" character varying(255), "author_id" integer, CONSTRAINT "PK_b7e242fccf271037f4d6a00d9dd" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "users" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "email" character varying(255) NOT NULL, "password" character varying(255) NOT NULL, "role" character varying(255) NOT NULL DEFAULT 'user', "avatar_img" character varying(255) NOT NULL, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "timelines_has_tags" ("timeline_id" bigint NOT NULL, "tag_id" integer NOT NULL, CONSTRAINT "PK_a769a41b318875912b523550884" PRIMARY KEY ("timeline_id", "tag_id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_fad0206ff54f6a6fbdfd1c98de" ON "timelines_has_tags" ("timeline_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_353f82826e2f1ab00abaab52b2" ON "timelines_has_tags" ("tag_id") `,
    );
    await queryRunner.query(
      `ALTER TABLE "posts" ADD CONSTRAINT "FK_312c63be865c81b922e39c2475e" FOREIGN KEY ("author_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "reply" ADD CONSTRAINT "FK_0d98e8ade07b472e8af8b856e1b" FOREIGN KEY ("author_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "reply" ADD CONSTRAINT "FK_26661bdd4c8727e914b5f2b10b5" FOREIGN KEY ("post_id") REFERENCES "posts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "timelines" ADD CONSTRAINT "FK_05860ff86c74e11227208651654" FOREIGN KEY ("author_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "timelines_has_tags" ADD CONSTRAINT "FK_fad0206ff54f6a6fbdfd1c98deb" FOREIGN KEY ("timeline_id") REFERENCES "timelines"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "timelines_has_tags" ADD CONSTRAINT "FK_353f82826e2f1ab00abaab52b29" FOREIGN KEY ("tag_id") REFERENCES "tags"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "timelines_has_tags" DROP CONSTRAINT "FK_353f82826e2f1ab00abaab52b29"`,
    );
    await queryRunner.query(
      `ALTER TABLE "timelines_has_tags" DROP CONSTRAINT "FK_fad0206ff54f6a6fbdfd1c98deb"`,
    );
    await queryRunner.query(
      `ALTER TABLE "timelines" DROP CONSTRAINT "FK_05860ff86c74e11227208651654"`,
    );
    await queryRunner.query(
      `ALTER TABLE "reply" DROP CONSTRAINT "FK_26661bdd4c8727e914b5f2b10b5"`,
    );
    await queryRunner.query(
      `ALTER TABLE "reply" DROP CONSTRAINT "FK_0d98e8ade07b472e8af8b856e1b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "posts" DROP CONSTRAINT "FK_312c63be865c81b922e39c2475e"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_353f82826e2f1ab00abaab52b2"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_fad0206ff54f6a6fbdfd1c98de"`,
    );
    await queryRunner.query(`DROP TABLE "timelines_has_tags"`);
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TABLE "timelines"`);
    await queryRunner.query(`DROP TABLE "tags"`);
    await queryRunner.query(`DROP TABLE "reply"`);
    await queryRunner.query(`DROP TABLE "posts"`);
  }
}

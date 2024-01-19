import { MigrationInterface, QueryRunner } from 'typeorm';

export class Init1705622339283 implements MigrationInterface {
  name = 'Init1705622339283';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "posts" ("id" BIGSERIAL NOT NULL, "createAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "title" character varying(255) NOT NULL, "content" text NOT NULL, "updateAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "img" character varying(255) NOT NULL, "authorId" integer, CONSTRAINT "UQ_8c59eff563e1375dfbbb311765f" UNIQUE ("img"), CONSTRAINT "PK_2829ac61eff60fcec60d7274b9e" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "reply" ("id" BIGSERIAL NOT NULL, "createAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "content" text NOT NULL, "title" character varying(255) NOT NULL, "updateAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "img" character varying(255) NOT NULL, "authorId" integer, "postId" bigint, CONSTRAINT "PK_94fa9017051b40a71e000a2aff9" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "tags" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "description" character varying(255) NOT NULL, "timelineId" bigint, CONSTRAINT "PK_e7dc17249a1148a1970748eda99" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "timelines" ("id" BIGSERIAL NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "title" character varying(255) NOT NULL, "content" text NOT NULL, "img" character varying(255) NOT NULL, "authorId" integer, CONSTRAINT "PK_b7e242fccf271037f4d6a00d9dd" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "users" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "email" character varying(255) NOT NULL, "password" character varying(255) NOT NULL, "role" character varying(255) NOT NULL DEFAULT 'user', "avatar_img" character varying(255) NOT NULL, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "posts" ADD CONSTRAINT "FK_c5a322ad12a7bf95460c958e80e" FOREIGN KEY ("authorId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "reply" ADD CONSTRAINT "FK_9c7aa85b4b2be67c1b7235d03fe" FOREIGN KEY ("authorId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "reply" ADD CONSTRAINT "FK_650bb493bc96cdc1c6a95d50ccd" FOREIGN KEY ("postId") REFERENCES "posts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "tags" ADD CONSTRAINT "FK_802d7528164904a380831ebdaa4" FOREIGN KEY ("timelineId") REFERENCES "timelines"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "timelines" ADD CONSTRAINT "FK_27c501af7c9c7c7ece5e81a2b7c" FOREIGN KEY ("authorId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "timelines" DROP CONSTRAINT "FK_27c501af7c9c7c7ece5e81a2b7c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "tags" DROP CONSTRAINT "FK_802d7528164904a380831ebdaa4"`,
    );
    await queryRunner.query(
      `ALTER TABLE "reply" DROP CONSTRAINT "FK_650bb493bc96cdc1c6a95d50ccd"`,
    );
    await queryRunner.query(
      `ALTER TABLE "reply" DROP CONSTRAINT "FK_9c7aa85b4b2be67c1b7235d03fe"`,
    );
    await queryRunner.query(
      `ALTER TABLE "posts" DROP CONSTRAINT "FK_c5a322ad12a7bf95460c958e80e"`,
    );
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TABLE "timelines"`);
    await queryRunner.query(`DROP TABLE "tags"`);
    await queryRunner.query(`DROP TABLE "reply"`);
    await queryRunner.query(`DROP TABLE "posts"`);
  }
}

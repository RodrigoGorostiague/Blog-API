import { MigrationInterface, QueryRunner } from 'typeorm';

export class Initial1705527151085 implements MigrationInterface {
  name = 'Initial1705527151085';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "users" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "email" character varying(255) NOT NULL, "password" character varying(255) NOT NULL, "role" character varying(255) NOT NULL, "avatarImg" character varying(255) NOT NULL, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "timelines" ("cratedAt" date NOT NULL, "title" character varying(255) NOT NULL, "content" text NOT NULL, "img" character varying(255) NOT NULL, "tag" character varying(255) NOT NULL, CONSTRAINT "PK_e66dd2d7bbd2efb70a03572436e" PRIMARY KEY ("cratedAt"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "posts" ("id" SERIAL NOT NULL, "title" character varying(255) NOT NULL, "content" text NOT NULL, "creatAt" date NOT NULL, "img" character varying(255) NOT NULL, "reply" character varying(255) NOT NULL, CONSTRAINT "PK_2829ac61eff60fcec60d7274b9e" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "posts"`);
    await queryRunner.query(`DROP TABLE "timelines"`);
    await queryRunner.query(`DROP TABLE "users"`);
  }
}

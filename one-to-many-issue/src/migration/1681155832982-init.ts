import { MigrationInterface, QueryRunner } from "typeorm";

export class init1681155832982 implements MigrationInterface {
    name = 'init1681155832982'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "action" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "date" TIMESTAMP, "title" character varying, "locationId" character varying, CONSTRAINT "PK_2d9db9cf5edfbbae74eb56e3a39" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_935a3aa70b27a1f9f1b5d7aa0f" ON "action" ("title") `);
        await queryRunner.query(`CREATE INDEX "IDX_ce43014c00f4521423b7c4ec71" ON "action" ("locationId") `);
        await queryRunner.query(`CREATE TABLE "location" ("id" character varying NOT NULL, "city" character varying NOT NULL, "province" character varying, "country" character varying, CONSTRAINT "PK_876d7bdba03c72251ec4c2dc827" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "action" ADD CONSTRAINT "FK_ce43014c00f4521423b7c4ec713" FOREIGN KEY ("locationId") REFERENCES "location"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "action" DROP CONSTRAINT "FK_ce43014c00f4521423b7c4ec713"`);
        await queryRunner.query(`DROP TABLE "location"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_ce43014c00f4521423b7c4ec71"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_935a3aa70b27a1f9f1b5d7aa0f"`);
        await queryRunner.query(`DROP TABLE "action"`);
    }

}

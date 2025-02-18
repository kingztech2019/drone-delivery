import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateDroneAndMedicationTables1739916600422 implements MigrationInterface {
    name = 'CreateDroneAndMedicationTables1739916600422'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "medication" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "weight" float NOT NULL, "code" varchar NOT NULL, "image" varchar NOT NULL, "droneId" integer)`);
        await queryRunner.query(`CREATE TABLE "drone" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "serialNumber" varchar(100) NOT NULL, "model" varchar NOT NULL, "weightLimit" float NOT NULL, "batteryCapacity" float NOT NULL, "state" varchar CHECK( "state" IN ('IDLE','LOADING','LOADED','DELIVERING','DELIVERED','RETURNING') ) NOT NULL DEFAULT ('IDLE'))`);
        await queryRunner.query(`CREATE TABLE "temporary_medication" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "weight" float NOT NULL, "code" varchar NOT NULL, "image" varchar NOT NULL, "droneId" integer, CONSTRAINT "FK_fb72ae0a4c294857b1b1d8df5d0" FOREIGN KEY ("droneId") REFERENCES "drone" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_medication"("id", "name", "weight", "code", "image", "droneId") SELECT "id", "name", "weight", "code", "image", "droneId" FROM "medication"`);
        await queryRunner.query(`DROP TABLE "medication"`);
        await queryRunner.query(`ALTER TABLE "temporary_medication" RENAME TO "medication"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "medication" RENAME TO "temporary_medication"`);
        await queryRunner.query(`CREATE TABLE "medication" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "weight" float NOT NULL, "code" varchar NOT NULL, "image" varchar NOT NULL, "droneId" integer)`);
        await queryRunner.query(`INSERT INTO "medication"("id", "name", "weight", "code", "image", "droneId") SELECT "id", "name", "weight", "code", "image", "droneId" FROM "temporary_medication"`);
        await queryRunner.query(`DROP TABLE "temporary_medication"`);
        await queryRunner.query(`DROP TABLE "drone"`);
        await queryRunner.query(`DROP TABLE "medication"`);
    }

}

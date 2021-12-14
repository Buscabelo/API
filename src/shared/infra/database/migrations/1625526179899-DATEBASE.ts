import {MigrationInterface, QueryRunner} from "typeorm";

export class DATEBASE1625526179899 implements MigrationInterface {
    name = 'DATEBASE1625526179899'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "avatar" character varying, "description" character varying, "address" character varying, "rating_average" double precision, "type" character varying NOT NULL, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_31ef2b4d30675d0c15056b7f6e" ON "user" ("type") `);
        await queryRunner.query(`CREATE TABLE "image" ("id" SERIAL NOT NULL, "url" character varying NOT NULL, "serviceId" integer, CONSTRAINT "PK_d6db1ab4ee9ad9dbe86c64e4cc3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "service_type_enum" AS ENUM('Corte', 'Tratamento', 'Barba', '')`);
        await queryRunner.query(`CREATE TABLE "service" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "value" double precision NOT NULL, "type" "service_type_enum" NOT NULL DEFAULT '', "providerId" uuid, CONSTRAINT "PK_85a21558c006647cd76fdce044b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "appointment" ("id" SERIAL NOT NULL, "scheduled_at" TIMESTAMP NOT NULL, "appointment_to" TIMESTAMP NOT NULL, "time_done_at" TIMESTAMP, "canceled_at" TIMESTAMP, "providerId" uuid, "customerId" uuid, "serviceId" integer, CONSTRAINT "REL_f013bda65c235464178ac02592" UNIQUE ("providerId"), CONSTRAINT "REL_c048c6004b69354f46183f93a8" UNIQUE ("customerId"), CONSTRAINT "REL_cee8b55c31f700609674da96b0" UNIQUE ("serviceId"), CONSTRAINT "PK_e8be1a53027415e709ce8a2db74" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "image" ADD CONSTRAINT "FK_78e6e41386abd0f8e9813086790" FOREIGN KEY ("serviceId") REFERENCES "service"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "service" ADD CONSTRAINT "FK_b05f15e928a4b35bd4b3426aa5c" FOREIGN KEY ("providerId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "appointment" ADD CONSTRAINT "FK_f013bda65c235464178ac025925" FOREIGN KEY ("providerId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "appointment" ADD CONSTRAINT "FK_c048c6004b69354f46183f93a85" FOREIGN KEY ("customerId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "appointment" ADD CONSTRAINT "FK_cee8b55c31f700609674da96b0b" FOREIGN KEY ("serviceId") REFERENCES "service"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "appointment" DROP CONSTRAINT "FK_cee8b55c31f700609674da96b0b"`);
        await queryRunner.query(`ALTER TABLE "appointment" DROP CONSTRAINT "FK_c048c6004b69354f46183f93a85"`);
        await queryRunner.query(`ALTER TABLE "appointment" DROP CONSTRAINT "FK_f013bda65c235464178ac025925"`);
        await queryRunner.query(`ALTER TABLE "service" DROP CONSTRAINT "FK_b05f15e928a4b35bd4b3426aa5c"`);
        await queryRunner.query(`ALTER TABLE "image" DROP CONSTRAINT "FK_78e6e41386abd0f8e9813086790"`);
        await queryRunner.query(`DROP TABLE "appointment"`);
        await queryRunner.query(`DROP TABLE "service"`);
        await queryRunner.query(`DROP TYPE "service_type_enum"`);
        await queryRunner.query(`DROP TABLE "image"`);
        await queryRunner.query(`DROP INDEX "IDX_31ef2b4d30675d0c15056b7f6e"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}

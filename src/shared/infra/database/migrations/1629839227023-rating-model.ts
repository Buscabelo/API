import {MigrationInterface, QueryRunner} from "typeorm";

export class ratingModel1629839227023 implements MigrationInterface {
    name = 'ratingModel1629839227023'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "rating" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "description" character varying, "rating_number" integer NOT NULL, CONSTRAINT "PK_ecda8ad32645327e4765b43649e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "appointment" ADD "ratingId" uuid`);
        await queryRunner.query(`ALTER TABLE "appointment" ADD CONSTRAINT "FK_06f6588091a01a9d3b9a91c7960" FOREIGN KEY ("ratingId") REFERENCES "rating"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "appointment" DROP CONSTRAINT "FK_06f6588091a01a9d3b9a91c7960"`);
        await queryRunner.query(`ALTER TABLE "appointment" DROP COLUMN "ratingId"`);
        await queryRunner.query(`DROP TABLE "rating"`);
    }

}

import {MigrationInterface, QueryRunner} from "typeorm";

export class updateDB1630271517687 implements MigrationInterface {
    name = 'updateDB1630271517687'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "appointment" DROP CONSTRAINT "FK_f013bda65c235464178ac025925"`);
        await queryRunner.query(`ALTER TABLE "appointment" DROP CONSTRAINT "FK_c048c6004b69354f46183f93a85"`);
        await queryRunner.query(`ALTER TABLE "appointment" DROP CONSTRAINT "FK_cee8b55c31f700609674da96b0b"`);
        await queryRunner.query(`ALTER TABLE "appointment" DROP CONSTRAINT "UQ_f013bda65c235464178ac025925"`);
        await queryRunner.query(`ALTER TABLE "appointment" DROP CONSTRAINT "UQ_c048c6004b69354f46183f93a85"`);
        await queryRunner.query(`ALTER TABLE "appointment" DROP CONSTRAINT "UQ_cee8b55c31f700609674da96b0b"`);
        await queryRunner.query(`ALTER TABLE "appointment" ADD CONSTRAINT "FK_f013bda65c235464178ac025925" FOREIGN KEY ("providerId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "appointment" ADD CONSTRAINT "FK_c048c6004b69354f46183f93a85" FOREIGN KEY ("customerId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "appointment" ADD CONSTRAINT "FK_cee8b55c31f700609674da96b0b" FOREIGN KEY ("serviceId") REFERENCES "service"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "appointment" DROP CONSTRAINT "FK_cee8b55c31f700609674da96b0b"`);
        await queryRunner.query(`ALTER TABLE "appointment" DROP CONSTRAINT "FK_c048c6004b69354f46183f93a85"`);
        await queryRunner.query(`ALTER TABLE "appointment" DROP CONSTRAINT "FK_f013bda65c235464178ac025925"`);
        await queryRunner.query(`ALTER TABLE "appointment" ADD CONSTRAINT "UQ_cee8b55c31f700609674da96b0b" UNIQUE ("serviceId")`);
        await queryRunner.query(`ALTER TABLE "appointment" ADD CONSTRAINT "UQ_c048c6004b69354f46183f93a85" UNIQUE ("customerId")`);
        await queryRunner.query(`ALTER TABLE "appointment" ADD CONSTRAINT "UQ_f013bda65c235464178ac025925" UNIQUE ("providerId")`);
        await queryRunner.query(`ALTER TABLE "appointment" ADD CONSTRAINT "FK_cee8b55c31f700609674da96b0b" FOREIGN KEY ("serviceId") REFERENCES "service"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "appointment" ADD CONSTRAINT "FK_c048c6004b69354f46183f93a85" FOREIGN KEY ("customerId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "appointment" ADD CONSTRAINT "FK_f013bda65c235464178ac025925" FOREIGN KEY ("providerId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}

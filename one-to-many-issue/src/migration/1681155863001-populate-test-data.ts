import { MigrationInterface, QueryRunner } from "typeorm"

export class populateTestData1681155863001 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
       await queryRunner.query(`INSERT INTO public.location(
	id, city, province, country)
	VALUES ('canada-alberta-calgary', 'Calgary', 'Alberta', 'Canada');
	
INSERT INTO public.location(
	id, city, province, country)
	VALUES ('canada-ontario-toronto', 'Toronto', 'Ontario', 'Canada');
	
INSERT INTO public.location(
	id, city, province, country)
	VALUES ('canada-bc-vancouver', 'Vancouver', 'BC', 'Canada');`);

    await queryRunner.query(`INSERT INTO public.action(
	id, date, title, "locationId")
	VALUES (uuid_generate_v4(), '2023-04-10T09:00', 'action in calgary', 'canada-alberta-calgary');
INSERT INTO public.action(
	id, date, title, "locationId")
	VALUES (uuid_generate_v4(), '2023-04-10T09:00', 'action in toronto', 'canada-ontario-toronto');
INSERT INTO public.action(
	id, date, title, "locationId")
	VALUES (uuid_generate_v4(), '2023-04-10T09:00', 'another action in toronto', 'canada-ontario-toronto');
INSERT INTO public.action(
	id, date, title, "locationId")
	VALUES (uuid_generate_v4(), '2023-04-10T09:00', 'action in vancouver', 'canada-bc-vancouver');`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}

import { MigrationInterface, QueryRunner } from 'typeorm';
import { Permission } from '../../../modules/entities/Permission';

export class permissionsSeed1672188406222 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.manager.save(
			queryRunner.manager.create<Permission>(Permission, [
				{
					value: 'products-list',
				},
				{
					value: 'products-modify',
				},
				{
					value: 'orders-list',
				},
				{
					value: 'users-list',
				},
			])
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`DELETE * FROM permissions`);
	}
}

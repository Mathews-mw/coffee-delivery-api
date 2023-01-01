import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class orderProducts1667611210911 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: 'order_products',
				columns: [
					{
						name: 'id',
						type: 'integer',
						isPrimary: true,
						isGenerated: true,
						generationStrategy: 'increment',
					},
					{
						name: 'order_id',
						type: 'integer',
					},
					{
						name: 'product_id',
						type: 'integer',
					},
					{
						name: 'created_at',
						type: 'timestamp',
						default: 'now()',
					},
				],
				foreignKeys: [
					{
						name: 'FKOrder',
						referencedTableName: 'orders',
						referencedColumnNames: ['id'],
						columnNames: ['order_id'],
						onDelete: 'CASCADE',
						onUpdate: 'CASCADE',
					},
					{
						name: 'FKProduct',
						referencedTableName: 'products',
						referencedColumnNames: ['id'],
						columnNames: ['product_id'],
						onDelete: 'CASCADE',
						onUpdate: 'CASCADE',
					},
				],
			})
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('order_products');
	}
}

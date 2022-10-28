import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class productTags1666392831045 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: 'product_tags',
				columns: [
					{
						name: 'id',
						type: 'integer',
						isPrimary: true,
						isGenerated: true,
						generationStrategy: 'increment',
					},
					{
						name: 'tag',
						type: 'varchar',
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
						name: 'FKProductTag',
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
		await queryRunner.dropTable('product_tags');
	}
}

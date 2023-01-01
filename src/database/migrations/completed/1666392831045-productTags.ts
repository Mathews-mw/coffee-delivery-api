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
						name: 'uuid_ref_product',
						type: 'uuid',
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
						referencedColumnNames: ['uuid_ref_tag'],
						columnNames: ['uuid_ref_product'],
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

import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class productsRegister1666391345588 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: 'products',
				columns: [
					{
						name: 'id',
						type: 'integer',
						isPrimary: true,
						isGenerated: true,
						generationStrategy: 'increment',
					},
					{
						name: 'product_name',
						type: 'varchar',
					},
					{
						name: 'price',
						type: 'numeric',
					},
					{
						name: 'description',
						type: 'varchar',
					},
					{
						name: 'image_name',
						type: 'varchar',
					},
					{
						name: 'uuid_ref_tag',
						type: 'uuid',
						isUnique: true,
					},
					{
						name: 'created_at',
						type: 'timestamp',
						default: 'now()',
					},
					{
						name: 'updated_at',
						type: 'Date',
						isNullable: true,
					},
				],
			})
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('products');
	}
}

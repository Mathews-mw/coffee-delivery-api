import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class ordered1667610280187 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: 'orders',
				columns: [
					{
						name: 'id',
						type: 'integer',
						isPrimary: true,
						isGenerated: true,
						generationStrategy: 'increment',
					},
					{
						name: 'user_id',
						type: 'integer',
					},
					{
						name: 'cep',
						type: 'varchar',
					},
					{
						name: 'rua',
						type: 'varchar',
					},
					{
						name: 'numero',
						type: 'varchar',
					},
					{
						name: 'complemento',
						type: 'varchar',
						isNullable: true,
					},
					{
						name: 'bairro',
						type: 'varchar',
					},
					{
						name: 'cidade',
						type: 'varchar',
					},
					{
						name: 'uf',
						type: 'varchar',
					},
					{
						name: 'payment',
						type: 'varchar',
					},
					{
						name: 'total_order',
						type: 'numeric',
					},
					{
						name: 'created_at',
						type: 'timestamp',
						default: 'now()',
					},
				],
				foreignKeys: [
					{
						name: 'FKUserOrder',
						referencedTableName: 'users',
						referencedColumnNames: ['id'],
						columnNames: ['user_id'],
						onDelete: 'CASCADE',
						onUpdate: 'CASCADE',
					},
				],
			})
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('order');
	}
}

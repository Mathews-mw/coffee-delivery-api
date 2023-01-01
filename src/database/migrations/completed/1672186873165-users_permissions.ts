import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class usersPermissions1672186873165 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: 'users_permissions',
				columns: [
					{
						name: 'id',
						type: 'integer',
						isPrimary: true,
						isGenerated: true,
						generationStrategy: 'increment',
					},
					{
						name: 'permission_id',
						type: 'integer',
					},
					{
						name: 'user_id',
						type: 'integer',
					},
				],
				foreignKeys: [
					{
						name: 'FKUsers',
						referencedTableName: 'users',
						referencedColumnNames: ['id'],
						columnNames: ['user_id'],
						onDelete: 'CASCADE',
						onUpdate: 'CASCADE',
					},
					{
						name: 'FKPermissions',
						referencedTableName: 'permissions',
						referencedColumnNames: ['id'],
						columnNames: ['permission_id'],
						onDelete: 'CASCADE',
						onUpdate: 'CASCADE',
					},
				],
			})
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('users_permissions');
	}
}

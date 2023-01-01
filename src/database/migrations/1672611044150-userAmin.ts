import { MigrationInterface, QueryRunner } from 'typeorm';
import { User } from '../../modules/entities/User';

export class userAmin1672611044150 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.manager.save(
			queryRunner.manager.create<User>(User, [
				{
					name: 'Super Admin',
					email: 'coffeedelivery@zohomail.com',
					phone_number: '92988283298',
					cpf: '99988877707',
					password: 'superAdmin@123',
					confirm_password: 'superAdmin@123',
					isAdmin: true,
				},
			])
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`DELETE * FROM users`);
	}
}

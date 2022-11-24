import { Column, CreateDateColumn, PrimaryColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
class User {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	name: string;

	@Column()
	email: string;

	@Column()
	phone_number: string;

	@Column()
	cpf: string;

	@Column()
	password: string;

	@Column()
	confirm_password: string;

	@Column()
	avatar: string;

	@Column()
	isAdmin: boolean;

	@CreateDateColumn()
	created_at: Date;

	@CreateDateColumn()
	updated_at?: Date;
}

export { User };

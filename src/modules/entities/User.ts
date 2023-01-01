import { Expose } from 'class-transformer';
import { Column, CreateDateColumn, PrimaryColumn, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany, ManyToMany } from 'typeorm';
import { Permission } from './Permission';
import { UserPermissions } from './UserPermissions';

interface IPermission {
	id: number;
	value: string;
}

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
	avatar?: string;

	avatar_url?: string;

	@Column()
	isAdmin: boolean;

	@CreateDateColumn()
	created_at: Date;

	@CreateDateColumn()
	updated_at?: Date;

	permissions: IPermission[][];

	getAvatarUrl(): string {
		switch (process.env.disk) {
			case 'local':
				return `${process.env.APP_API_URL}/avatar/${this.avatar}`;
			case 's3':
				return `${process.env.AWS_BUCKET_URL}/avatar/${this.avatar}`;
			default:
				return null;
		}
	}
}

export { User };

import {
	Column,
	CreateDateColumn,
	PrimaryColumn,
	Entity,
	PrimaryGeneratedColumn,
} from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

@Entity('users')
class User {
	@PrimaryGeneratedColumn()
	id: string;

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
	isAdmin: boolean;

	@Column()
	avatar: string;

	@CreateDateColumn()
	created_at: Date;

	@CreateDateColumn()
	updated_at?: Date;

	/* constructor() {
    if (!this.id) {
      this.id = uuidV4()
    }
  } */
}

export { User };

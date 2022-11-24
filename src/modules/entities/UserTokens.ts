import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

import { User } from './User';

@Entity('users_tokens')
class UserTokens {
	@PrimaryColumn()
	id: number;

	@Column()
	refresh_token: string;

	@Column()
	user_id: number;

	@ManyToOne(() => User)
	@JoinColumn({ name: 'user_id' })
	user: User;

	@Column()
	expires_date: Date;

	@CreateDateColumn()
	created_at: Date;
}

export { UserTokens };

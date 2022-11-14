import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import { User } from './User';

@Entity('orders', { orderBy: { created_at: 'DESC' } })
class Order {
	@PrimaryColumn()
	id: number;

	@Column()
	user_id: number;

	@OneToOne(() => User)
	@JoinColumn({ name: 'user_id' })
	user: User;

	@Column()
	cep: string;

	@Column()
	rua: string;

	@Column()
	numero: string;

	@Column()
	complemento: string;

	@Column()
	bairro: string;

	@Column()
	cidade: string;

	@Column()
	uf: string;

	@Column()
	payment: string;

	@Column()
	total_order: number;

	@CreateDateColumn()
	created_at: Date;
}

export { Order };

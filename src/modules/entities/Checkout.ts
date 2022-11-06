import { Column, CreateDateColumn, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryColumn } from 'typeorm';

import { Order } from './Order';
import { Product } from './Product';

@Entity('order_products')
class Checkout {
	@PrimaryColumn()
	id: number;

	@Column()
	order_id: number;

	@ManyToOne(() => Order)
	@JoinColumn({ name: 'order_id' })
	order: Order;

	@Column()
	product_id: number;

	@ManyToOne(() => Product)
	@JoinColumn({ name: 'product_id' })
	product: Product;

	@CreateDateColumn()
	created_at: Date;
}

export { Checkout };

import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';

@Entity('products')
class Product {
	@PrimaryColumn()
	id: number;

	@Column()
	product_name: string;

	@Column()
	price: number;

	@Column()
	description: string;

	@Column()
	image_name: string;

	@CreateDateColumn()
	created_at: Date;

	@CreateDateColumn()
	updated_at?: Date;

	@Column()
	uuid_ref_tag: string;
}

export { Product };

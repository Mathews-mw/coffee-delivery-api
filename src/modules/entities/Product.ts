import { Expose } from 'class-transformer';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, JoinTable, OneToMany, ManyToMany } from 'typeorm';

import { Tag } from './Tag';

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

	@Column()
	uuid_ref_tag: string;

	@CreateDateColumn()
	created_at: Date;

	@CreateDateColumn()
	updated_at?: Date;

	@Expose({ name: 'products_image_url' })
	getImageUrl(): string {
		switch (process.env.disk) {
			case 'local':
				return `${process.env.APP_API_URL}/productsImages/${this.image_name}`;
			case 's3':
				return `${process.env.AWS_BUCKET_URL}/productsImages/${this.image_name}`;
			default:
				return null;
		}
	}
}

export { Product };

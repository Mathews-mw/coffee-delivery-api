import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Product } from './Product';

@Entity('product_tags')
class Tag {
	@PrimaryColumn()
	id: number;

	@Column()
	tag: string;

	@ManyToOne(() => Product)
	@JoinColumn({ name: 'uuid_ref_product' })
	product: Product;

	@Column()
	created_at: Date;

	@Column()
	uuid_ref_product: string;
}

export { Tag };

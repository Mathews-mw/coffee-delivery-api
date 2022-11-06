import { Checkout } from '../entities/Checkout';

export interface ICreateCheckoutDTO {
	order_id: number;
	product_id: number;
}

export interface ICheckoutRepository {
	create(data: ICreateCheckoutDTO): Promise<Checkout>;
}

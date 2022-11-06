import { Repository } from 'typeorm';
import AppDataSource from '../../../database/data-source';

import { Checkout } from '../../entities/Checkout';
import { ICheckoutRepository, ICreateCheckoutDTO } from '../ICheckoutRepository';

class CheckoutsRepository implements ICheckoutRepository {
	private repository: Repository<Checkout>;

	constructor() {
		this.repository = AppDataSource.getRepository(Checkout);
	}

	async create(data: ICreateCheckoutDTO): Promise<Checkout> {
		const { order_id, product_id } = data;

		const newCheckout = this.repository.create({
			order_id,
			product_id,
		});

		await this.repository.save(newCheckout);

		return newCheckout;
	}
}

export { CheckoutsRepository };

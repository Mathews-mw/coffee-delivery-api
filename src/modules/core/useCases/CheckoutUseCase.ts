import { inject, injectable } from 'tsyringe';

import { Checkout } from '../../entities/Checkout';
import { ICheckoutRepository } from '../../repositories/ICheckoutRepository';
import { CheckoutsRepository } from '../../repositories/implementations/CheckoutsRepository';

interface IRequest {
	order_id: number;
	product_id: number;
}

@injectable()
class CheckoutUseCase {
	constructor(
		@inject(CheckoutsRepository)
		private checkoutRepository: ICheckoutRepository
	) {}

	async executeCreate(checkouts: IRequest[]): Promise<void> {
		const checkout = await Promise.all(
			checkouts.map(async (checkout) => {
				await this.checkoutRepository.create({
					order_id: checkout.order_id,
					product_id: checkout.product_id,
				});
			})
		);
	}
}

export { CheckoutUseCase };

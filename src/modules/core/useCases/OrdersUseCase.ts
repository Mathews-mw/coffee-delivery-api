import { inject, injectable } from 'tsyringe';

import { Order } from '../../entities/Order';
import { IOrderRepository } from '../../repositories/IOrderRepository';
import { ICheckoutRepository } from '../../repositories/ICheckoutRepository';
import { OrdersRepository } from '../../repositories/implementations/OrdersRepository';
import { CheckoutsRepository } from '../../repositories/implementations/CheckoutsRepository';

interface IRequest {
	user_id: string;
	cep: string;
	rua: string;
	numero: string;
	complemento?: string;
	bairro: string;
	cidade: string;
	uf: string;
	payment: 'creditCard' | 'debitCard' | 'cash';
	productsIds: {
		product_id: number;
	}[];
	total_order: number;
}

@injectable()
class OrdersUseCase {
	constructor(
		@inject(OrdersRepository)
		private orderRespository: IOrderRepository,
		@inject(CheckoutsRepository)
		private checkoutRepository: ICheckoutRepository
	) {}

	async executeCreate({ user_id, cep, rua, numero, complemento, bairro, cidade, uf, payment, productsIds, total_order }: IRequest): Promise<Order> {
		const userIdFormatted = Number(user_id);

		const order = await this.orderRespository.create({
			user_id: userIdFormatted,
			cep,
			rua,
			numero,
			complemento,
			bairro,
			cidade,
			uf,
			payment,
			total_order,
		});

		await Promise.all(
			productsIds.map(async (checkout) => {
				await this.checkoutRepository.create({
					order_id: order.id,
					product_id: checkout.product_id,
				});
			})
		);

		return order;
	}

	async executeIndexByUserId(user_id: number): Promise<Order[]> {
		const order = await this.orderRespository.indexByUserId(user_id);

		return order;
	}
}

export { OrdersUseCase };

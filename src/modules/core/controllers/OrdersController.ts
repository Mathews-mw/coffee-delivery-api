import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { OrdersUseCase } from '../useCases/OrdersUseCase';

class OrdersController {
	async handleCreate(request: Request, response: Response): Promise<Response> {
		const { cep, rua, numero, complemento, bairro, cidade, uf, payment, productsIds, total_order } = request.body;
		const user = request.user;

		const ordersUSeCase = container.resolve(OrdersUseCase);

		try {
			if (!user) {
				return response.status(404).json({ message: 'Nenhum pedido foi criado' });
			}

			if (payment !== 'creditCard' && payment !== 'debitCard' && payment !== 'cash') {
				return response.status(404).json({ message: 'Erro no tipo de pagamento' });
			}

			const newOrder = await ordersUSeCase.executeCreate({
				user_id: user.id,
				cep,
				rua,
				numero,
				complemento,
				bairro,
				cidade,
				uf,
				payment,
				productsIds,
				total_order,
			});

			return response.status(201).json({ order: newOrder, message: 'Pedido criado com sucesso' });
		} catch (error) {
			console.log(error);
			return response.status(400).json({ message: 'Erro ao tentar realizar pedido' });
		}
	}

	async handleIndexByUserId(request: Request, response: Response): Promise<Response> {
		const { user_id } = request.params;

		const ordersUseCase = container.resolve(OrdersUseCase);

		try {
			if (!user_id) {
				return response.status(400).json({ message: 'Nenhuma ordem de compra encontrada' });
			}

			const userIdFormatted = Number(user_id);

			const userOrders = await ordersUseCase.executeIndexByUserId(userIdFormatted);

			return response.json(userOrders);
		} catch (error) {
			console.log(error);
			return response.status(404).json({ message: 'Erro ao tentar listar ordens de compra' });
		}
	}
}

export { OrdersController };

import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CheckoutUseCase } from '../useCases/CheckoutUseCase';

class CheckoutController {
	async handleCreate(request: Request, response: Response): Promise<Response> {
		const checkout = request.body;

		const checkoutUseCase = container.resolve(CheckoutUseCase);

		try {
			await checkoutUseCase.executeCreate(checkout);
			return response.status(201).json({ message: 'Checkout criado com sucesso' });
		} catch (error) {
			console.log(error);
			return response.status(400).json({ message: 'Erro ao tentar criar checkout' });
		}
	}
}

export { CheckoutController };

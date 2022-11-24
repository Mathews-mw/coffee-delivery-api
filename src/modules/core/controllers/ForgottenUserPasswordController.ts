import { container } from 'tsyringe';
import { Request, Response } from 'express';

import { ForgottenUserPasswordUseCase } from '../useCases/ForgottenUserPasswordUseCase';

class ForgottenUserPasswordController {
	async handle(request: Request, response: Response): Promise<Response> {
		const { email } = request.body;

		try {
			if (!email) {
				return response.status(404).json({ message: 'Nenhum e-mail foi enviado' });
			}

			const forgottenUserPasswordUseCase = container.resolve(ForgottenUserPasswordUseCase);

			await forgottenUserPasswordUseCase.execute(email);

			return response.json({ message: 'O link para alterar sua senha foi enviado para o seu e-mail' });
		} catch (error) {
			console.error(error);
			return response.status(400).json({ message: 'Algo deu errado ao tentar enviar o e-mail' });
		}
	}
}

export { ForgottenUserPasswordController };

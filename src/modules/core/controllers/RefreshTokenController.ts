import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { RefreshTokenUseCase } from '../useCases/RefreshTokenUseCase';

class RefreshTokenController {
	async handleCreate(request: Request, response: Response): Promise<Response> {
		const token = request.body.token || request.headers['x-acess-token'] || request.query.token;

		try {
			const refreshTokenUseCase = container.resolve(RefreshTokenUseCase);

			const refresh_token = await refreshTokenUseCase.executeCreate(token);

			return response.status(201).json(refresh_token);
		} catch (error) {
			console.log(error);
			return response.status(400).json({ message: 'Erro ao tentar validar refresh token' });
		}
	}
}

export { RefreshTokenController };

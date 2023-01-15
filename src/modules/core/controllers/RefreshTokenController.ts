import { Request, Response } from 'express';
import { container } from 'tsyringe';
import auth from '../../../config/auth';
import { RefreshTokenUseCase } from '../useCases/RefreshTokenUseCase';

class RefreshTokenController {
	async handleCreate(request: Request, response: Response): Promise<Response> {
		const token = request.body.token || request.headers['x-acess-token'] || request.query.token;

		try {
			const refreshTokenUseCase = container.resolve(RefreshTokenUseCase);

			const refresh_token = await refreshTokenUseCase.executeCreate(token);

			if (!refresh_token) {
				return response.status(401).json({ error: 'Token Invalid' });
			}

			return response.status(201).json(refresh_token);
		} catch (error) {
			const { expiredAt } = error;

			if (expiredAt) {
				return response.status(401).json({ error: auth.expires_token_message_error });
			}

			return response.status(400).json({ error: 'Erro ao tentar validar refresh token' });
		}
	}
}

export { RefreshTokenController };

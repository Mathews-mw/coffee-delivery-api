import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import auth from '../config/auth';
import { UserRepository } from '../modules/repositories/implementations/UsersRepository';
import { UsersTokensRepository } from '../modules/repositories/implementations/UsersTokensRepository';

interface IPayload {
	sub: string;
}

export async function ensureAuthenticate(request: Request, response: Response, next: NextFunction) {
	const authHeader = request.headers.authorization;

	if (!authHeader) {
		return response.status(401).json({ message: 'Token Invalid' });
	}

	const [, token] = authHeader.split(' ');

	try {
		const decoded = verify(token, auth.secret_token) as IPayload;
		const { sub: user_id } = decoded;

		request.user = {
			id: user_id,
		};

		next();
	} catch (error) {
		const { expiredAt } = error;
		if (expiredAt) {
			return response.status(401).json({ error: auth.expires_token_message_error });
		}
		return response.status(401).json({ error: 'Token Invalid' });
	}
}

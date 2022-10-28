import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { UserRepository } from '../modules/repositories/implementations/UsersRepository';

interface IPayload {
	sub: string;
}

export async function ensureAuthenticate(request: Request, response: Response, next: NextFunction) {
	const authHeader = request.headers.authorization;

	if (!authHeader) {
		return response.status(401).json({ message: 'Token Invalid!' });
	}

	const [, token] = authHeader.split(' ');

	try {
		const decoded = verify(token, 'ecab09c93eb09c2d2eb13449044fd4e3') as IPayload;
		const { sub: user_id } = decoded;

		const userRepository = new UserRepository();

		const idFormatted = Number(user_id);
		const user = await userRepository.findByID(idFormatted);

		if (!user) {
			return response.status(401).json({ message: 'User does not exists!' });
		}

		request.user = {
			id: user_id,
		};

		next();
	} catch (error) {
		return response.status(401).json({ message: 'Token Invalid!' });
	}
}

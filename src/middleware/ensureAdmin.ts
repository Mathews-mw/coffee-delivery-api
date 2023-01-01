import { NextFunction, Request, Response } from 'express';
import { UserRepository } from '../modules/repositories/implementations/UsersRepository';

export async function ensureAdmin(request: Request, response: Response, next: NextFunction) {
	const { id } = request.user;

	const userRepository = new UserRepository();

	try {
		const user = await userRepository.findByID(Number(id));
		const isAdmin = user.isAdmin;

		if (!isAdmin) {
			return response.status(401).json({ error: 'Not allowed to acess this route' });
		}

		return next();
	} catch (error) {
		return response.status(404).json({ error: 'User not found' });
	}
}

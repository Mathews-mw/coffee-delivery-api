import chalk from 'chalk';
import { Request, Response } from 'express';
import { AuthUserUseCase } from './AuthUserUSeCase';

class AuthUserController {
	constructor(private authUserUseCase: AuthUserUseCase) {}

	async handle(request: Request, response: Response): Promise<Response> {
		const { email, password } = request.body;

		const token = await this.authUserUseCase.execute({ email, password });

		return response.status(200).json(token);
	}
}

export { AuthUserController };

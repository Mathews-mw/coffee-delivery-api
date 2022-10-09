import { IUserRepository } from '../../repositories/IUserRepository';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import chalk from 'chalk';

interface IRequest {
	email: string;
	password: string;
}

interface IResponse {
	token: string;
	user: {
		name: string;
		password: string;
	};
}

class AuthUserUseCase {
	constructor(private UserRepository: IUserRepository) {}

	async execute({ email, password }: IRequest): Promise<IResponse> {
		const user = await this.UserRepository.findByEmail(email);

		if (!user) {
			throw new Error('Email or password incorrect!');
		}

		const passwordMatch = await compare(password, user.password);

		if (!passwordMatch) {
			throw new Error('Email or password incorrect!');
		}

		const token = sign({}, 'ecab09c93eb09c2d2eb13449044fd4e3', {
			subject: user.id.toString(),
			expiresIn: '1d',
		});

		delete user.password;

		const returnToken = {
			token: token,
			user: {
				name: user.name,
				password: user.password,
			},
		};

		return returnToken;
	}
}

export { AuthUserUseCase };

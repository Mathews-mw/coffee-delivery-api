import { inject, injectable } from 'tsyringe';
import { sign } from 'jsonwebtoken';
import { compare } from 'bcryptjs';
import { IUserRepository } from '../../repositories/IUserRepository';
import { UserRepository } from '../../repositories/implementations/UsersRepository';

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

@injectable()
class AuthUserUseCase {
	constructor(
		@inject(UserRepository)
		private UserRepository: IUserRepository
	) {}

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
		delete user.confirm_password;

		const returnToken = {
			token: token,
			user,
		};

		return returnToken;
	}
}

export { AuthUserUseCase };

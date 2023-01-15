import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import auth from '../../../config/auth';
import { UserPermissions } from '../../entities/UserPermissions';
import { IUserRepository } from '../../repositories/IUserRepository';
import { IDateProvider } from '../../../shared/providers/IDateProvider';
import { IUsersTokensRepository } from '../../repositories/IUsersTokensRepository';
import { UserRepository } from '../../repositories/implementations/UsersRepository';
import { DateProvider } from '../../../shared/providers/implementations/DateProvider';
import { IUserPermissionsRepository } from '../../repositories/IUserPermissionsRepository';
import { UsersTokensRepository } from '../../repositories/implementations/UsersTokensRepository';
import { UserPermissionsRepository } from '../../repositories/implementations/UserPermissionsRepository';

interface IRequest {
	email: string;
	password: string;
}

interface IResponse {
	token: string;
	user: {
		name: string;
		email: string;
	};
	refresh_token: string;
}

@injectable()
class AuthUserUseCase {
	constructor(
		@inject(UserRepository)
		private UserRepository: IUserRepository,
		@inject(UsersTokensRepository)
		private usersTokensRepository: IUsersTokensRepository,
		@inject(DateProvider)
		private dateProvider: IDateProvider,
		@inject(UserPermissionsRepository)
		private userPermissionsRepository: IUserPermissionsRepository
	) {}

	async execute({ email, password }: IRequest): Promise<IResponse> {
		const user = await this.UserRepository.findByEmail(email);
		let userAvatarUrl: string;
		let userPermissions: UserPermissions[];

		const { secret_token, secret_refresh_token, expires_in_token, expires_in_refresh_token, expires_in_refresh_token_days } = auth;

		if (!user) {
			throw new Error('Email or password incorrect!');
		}

		const passwordMatch = await compare(password, user.password);

		if (!passwordMatch) {
			throw new Error('Email or password incorrect!');
		}

		const token = sign({}, secret_token, {
			subject: user.id.toString(),
			expiresIn: expires_in_token,
		});

		const refresh_token = sign({ email }, secret_refresh_token, {
			subject: user.id.toString(),
			expiresIn: expires_in_refresh_token,
		});

		const refresh_token_expires_date = this.dateProvider.addDays(expires_in_refresh_token_days);

		await this.usersTokensRepository.create({
			user_id: user.id,
			refresh_token,
			expires_date: refresh_token_expires_date,
		});

		delete user.password;
		delete user.confirm_password;

		if (user) {
			userAvatarUrl = user.getAvatarUrl();

			userPermissions = await this.userPermissionsRepository.indexByUserId(user.id);
		}

		if (userPermissions) {
			user.permissions = userPermissions.map((permission) => {
				return permission.permission;
			});
		}

		if (userAvatarUrl) {
			user.avatar_url = userAvatarUrl;
		}

		const returnToken: IResponse = {
			token: token,
			user,
			refresh_token,
		};

		return returnToken;
	}
}

export { AuthUserUseCase };

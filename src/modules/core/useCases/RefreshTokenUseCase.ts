import { sign, verify } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import auth from '../../../config/auth';
import { HandleErrors } from '../../../shared/errors/HandleErrors';
import { IDateProvider } from '../../../shared/providers/IDateProvider';
import { IUsersTokensRepository } from '../../repositories/IUsersTokensRepository';
import { DateProvider } from '../../../shared/providers/implementations/DateProvider';
import { UsersTokensRepository } from '../../repositories/implementations/UsersTokensRepository';

interface IPayload {
	sub: string;
	email: string;
}

interface ITokenResponse {
	token: string;
	refresh_token: string;
}

@injectable()
class RefreshTokenUseCase {
	constructor(
		@inject(UsersTokensRepository)
		private usersTokensRepository: IUsersTokensRepository,
		@inject(DateProvider)
		private dateProvider: IDateProvider
	) {}

	async executeCreate(token: string): Promise<ITokenResponse> {
		const { sub, email } = verify(token, auth.secret_refresh_token) as IPayload;
		const { secret_refresh_token, expires_in_refresh_token, expires_in_refresh_token_days } = auth;

		const user_id = sub;
		const user_id_formatted = Number(user_id);

		const userTokens = await this.usersTokensRepository.findByUserIdAndRefreshToken(user_id_formatted, token);

		if (!userTokens) {
			throw new HandleErrors('Refresh token does not exists');
		}

		await this.usersTokensRepository.deleteById(userTokens.id);

		const refresh_token = sign({ email }, secret_refresh_token, {
			subject: sub,
			expiresIn: expires_in_refresh_token,
		});

		const refresh_token_expires_date = this.dateProvider.addDays(expires_in_refresh_token_days);

		await this.usersTokensRepository.create({
			user_id: user_id_formatted,
			refresh_token,
			expires_date: refresh_token_expires_date,
		});

		const newToken = sign({}, auth.secret_token, {
			subject: user_id,
			expiresIn: auth.expires_in_token,
		});

		return {
			token: newToken,
			refresh_token,
		};
	}
}

export { RefreshTokenUseCase };

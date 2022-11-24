import { hash } from 'bcryptjs';
import { inject, injectable } from 'tsyringe';

import { HandleErrors } from '../../../shared/errors/HandleErrors';
import { IUserRepository } from '../../repositories/IUserRepository';
import { IDateProvider } from '../../../shared/providers/IDateProvider';
import { IUsersTokensRepository } from '../../repositories/IUsersTokensRepository';
import { UserRepository } from '../../repositories/implementations/UsersRepository';
import { DateProvider } from '../../../shared/providers/implementations/DateProvider';
import { UsersTokensRepository } from '../../repositories/implementations/UsersTokensRepository';

interface IRequest {
	token: string;
	password: string;
}

@injectable()
class ResetPasswordUserUseCase {
	constructor(
		@inject(UserRepository)
		private userRespository: IUserRepository,
		@inject(UsersTokensRepository)
		private usersTokensRepository: IUsersTokensRepository,
		@inject(DateProvider)
		private dateProvider: IDateProvider
	) {}

	async execute({ token, password }: IRequest) {
		const userToken = await this.usersTokensRepository.findByRefreshToken(token);

		if (!userToken) {
			throw new HandleErrors('Token invalid!');
		}

		if (this.dateProvider.compareIfBefore(userToken.expires_date, new Date())) {
			throw new HandleErrors('Token expired!');
		}

		const user = await this.userRespository.findByID(userToken.user_id);

		user.password = await hash(password, 8);

		await this.userRespository.create(user);

		await this.usersTokensRepository.deleteById(userToken.id);
	}
}

export { ResetPasswordUserUseCase };

import { Repository } from 'typeorm';

import { UserTokens } from '../../entities/UserTokens';
import AppDataSource from '../../../database/data-source';
import { ICreateUserTokensDTO, IUsersTokensRepository } from '../IUsersTokensRepository';

class UsersTokensRepository implements IUsersTokensRepository {
	private repository: Repository<UserTokens>;

	constructor() {
		this.repository = AppDataSource.getRepository(UserTokens);
	}

	async create({ user_id, refresh_token, expires_date }: ICreateUserTokensDTO): Promise<UserTokens> {
		const newUserTokens = this.repository.create({
			user_id,
			refresh_token,
			expires_date,
		});

		await this.repository.save(newUserTokens);

		return newUserTokens;
	}

	async findByUserIdAndRefreshToken(user_id: number, refresh_token: string): Promise<UserTokens> {
		const userTokens = await this.repository.findOneBy({ user_id, refresh_token });

		return userTokens;
	}

	async findByRefreshToken(refresh_token: string): Promise<UserTokens> {
		const userTokens = await this.repository.findOneBy({ refresh_token });

		return userTokens;
	}

	async deleteById(id: number): Promise<void> {
		await this.repository.delete({ id });
	}
}

export { UsersTokensRepository };

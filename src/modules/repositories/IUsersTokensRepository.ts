import { UserTokens } from '../entities/UserTokens';

export interface ICreateUserTokensDTO {
	user_id: number;
	refresh_token: string;
	expires_date: Date;
}

export interface IUsersTokensRepository {
	create({ user_id, refresh_token, expires_date }: ICreateUserTokensDTO): Promise<UserTokens>;
	findByUserIdAndRefreshToken(user_id: number, refresh_token: string): Promise<UserTokens>;
	findByRefreshToken(refresh_token: string): Promise<UserTokens>;
	deleteById(id: number): Promise<void>;
}

import { deleteFile } from '../../../utils/fileManager';
import chalk from 'chalk';
import { User } from '../../entities/User';
import { IUserRepository } from '../../repositories/IUserRepository';
import { injectable, inject } from 'tsyringe';
import { UserRepository } from '../../repositories/implementations/UsersRepository';
import { HandleErrors } from '../../../shared/errors/HandleErrors';

interface IRequest {
	name: string;
	email: string;
	phone_number: string;
	cpf: string;
	password: string;
	confirm_password: string;
	avatar: string;
}

interface IUpdateRequest {
	id: string;
	name: string;
	email: string;
	phone_number: string;
}

@injectable()
class UserUseCase {
	constructor(
		@inject(UserRepository)
		private userRepository: IUserRepository
	) {}

	async executeCreate(data: IRequest): Promise<void> {
		const { name, email, phone_number, cpf, password, confirm_password, avatar } = data;

		const userAlreadyExists = await this.userRepository.findByCPF(cpf);
		if (userAlreadyExists) {
			throw new Error('User Already exists!');
		}

		await this.userRepository.create({
			name,
			email,
			phone_number,
			cpf,
			password,
			confirm_password,
			avatar,
		});
	}

	async executeListAllUsers(): Promise<User[]> {
		try {
			const allUsers = await this.userRepository.getAllUsers();

			return allUsers;
		} catch (error) {
			throw new HandleErrors('Token Invalid!');
		}
	}

	async executeFindByCPF(cpf: string): Promise<User> {
		const user = this.userRepository.findByCPF(cpf);

		if (!user) {
			throw new HandleErrors('User not found!');
		}

		return user;
	}

	async executeUpdateUser({ id, name, email, phone_number }: IUpdateRequest): Promise<void> {
		const idNumber = Number(id);
		const user = await this.userRepository.findByID(idNumber);

		if (!user) {
			console.log('erro!');
			throw new Error(chalk.bgYellow('User not found!'));
		}

		await this.userRepository.updateUser({ id, name, email, phone_number });

		return;
	}

	async executeUpdateUseravatar(id: string, avatar_file: string): Promise<void> {
		const idNumber = Number(id);
		const user = await this.userRepository.findByID(idNumber);

		if (!user) {
			throw new Error(chalk.bgYellow('User not found!'));
		}

		if (user.avatar) {
			await deleteFile(`./tmp/avatar/${user.avatar}`);
		}

		await this.userRepository.UpdateUserAvatar(user, avatar_file);

		return;
	}
}

export { UserUseCase };

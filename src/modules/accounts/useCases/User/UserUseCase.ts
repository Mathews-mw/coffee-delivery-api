import { deleteFile } from '../../../../utils/fileManager';
import chalk from 'chalk';
import { User } from '../../entities/User';
import { IUserRepository } from '../../repositories/IUserRepository';

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

class UserUseCase {
	constructor(private userRepository: IUserRepository) {}

	async executeCreate(data: IRequest): Promise<void> {
		const {
			name,
			email,
			phone_number,
			cpf,
			password,
			confirm_password,
			avatar,
		} = data;

		const userAlreadyExists = await this.userRepository.findByCPF(cpf);
		if (userAlreadyExists) {
			throw new Error(chalk.bgYellow('User Already exists!'));
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

	async executeListAllUsers(cpf): Promise<User[]> {
		const user = await this.userRepository.findByCPF(cpf);

		if (!user) {
			throw new Error(chalk.bgYellow('Usuário não existe na base de dados'));
		}

		const allUsers = await this.userRepository.getAllUsers();

		return allUsers;
	}

	async executeFindByCPF(cpf: string): Promise<User> {
		const user = this.userRepository.findByCPF(cpf);

		if (!user) {
			throw new Error(chalk.bgYellow('User not found!'));
		}

		return user;
	}

	async executeUpdateUser({
		id,
		name,
		email,
		phone_number,
	}: IUpdateRequest): Promise<void> {
		const user = await this.userRepository.findByID(id);
		if (!user) {
			throw new Error(chalk.bgYellow('User not found!'));
		}

		await this.userRepository.updateUser({ id, name, email, phone_number });

		return;
	}

	async executeUpdateUseravatar(
		id: string,
		avatar_file: string
	): Promise<void> {
		const user = await this.userRepository.findByID(id);

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

import { UpdateResult } from 'typeorm';
import { injectable, inject } from 'tsyringe';

import { User } from '../../entities/User';
import { UserPermissions } from '../../entities/UserPermissions';
import { HandleErrors } from '../../../shared/errors/HandleErrors';
import { IUserRepository } from '../../repositories/IUserRepository';
import { IStorageProvider } from '../../../shared/providers/IStorageProvider';
import { UserRepository } from '../../repositories/implementations/UsersRepository';
import { IUserPermissionsRepository } from '../../repositories/IUserPermissionsRepository';
import { S3StorageProvider } from '../../../shared/providers/implementations/S3StorageProvider';
import { LocalStorageProvider } from '../../../shared/providers/implementations/LocalStorageProvider';
import { UserPermissionsRepository } from '../../repositories/implementations/UserPermissionsRepository';

interface IRequest {
	name: string;
	email: string;
	phone_number: string;
	cpf: string;
	password: string;
	confirm_password: string;
}

interface IUpdateRequest {
	id: string;
	name: string;
	email: string;
	phone_number: string;
}

const diskStorage = {
	local: LocalStorageProvider,
	s3: S3StorageProvider,
};

@injectable()
class UserUseCase {
	constructor(
		@inject(UserRepository)
		private userRepository: IUserRepository,
		@inject(UserPermissionsRepository)
		private userPermissionsRepository: IUserPermissionsRepository,
		@inject(diskStorage[process.env.disk])
		private storageProvider: IStorageProvider
	) {}

	async executeCreate(data: IRequest): Promise<void> {
		const { name, email, phone_number, cpf, password, confirm_password } = data;

		await this.userRepository.create({
			name,
			email,
			phone_number,
			cpf,
			password,
			confirm_password,
		});
	}

	async executeUpdateUser({ id, name, email, phone_number }: IUpdateRequest): Promise<UpdateResult> {
		const idNumber = Number(id);

		const updateUser = await this.userRepository.updateUser({ id: idNumber, name, email, phone_number });

		return updateUser;
	}

	async executeUpdateUseravatar(id: string, avatar_file: string): Promise<UpdateResult> {
		const idNumber = Number(id);
		const user = await this.userRepository.findByID(idNumber);

		if (user.avatar) {
			await this.storageProvider.delete(user.avatar, 'avatar');
		}

		await this.storageProvider.save(avatar_file, 'avatar');

		const updateUserAvatar = await this.userRepository.UpdateUserAvatar(idNumber, avatar_file);

		return updateUserAvatar;
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
		let userAvatarUrl: string;
		let userPermissions: UserPermissions[];

		const user = await this.userRepository.findByCPF(cpf);

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

		return user;
	}
}

export { UserUseCase };

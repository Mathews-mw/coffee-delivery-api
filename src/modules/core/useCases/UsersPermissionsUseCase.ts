import { inject, injectable } from 'tsyringe';
import { DeleteResult, UpdateResult } from 'typeorm';

import { UserPermissions } from '../../entities/UserPermissions';
import { IUserPermissionsRepository } from '../../repositories/IUserPermissionsRepository';
import { UserPermissionsRepository } from '../../repositories/implementations/UserPermissionsRepository';

interface IRequest {
	permission_id: number;
	user_id: number;
}

@injectable()
class UsersPermissionsUseCase {
	constructor(
		@inject(UserPermissionsRepository)
		private userPermissionsRepository: IUserPermissionsRepository
	) {}

	async executeCreate({ permission_id, user_id }: IRequest): Promise<UserPermissions> {
		const newUserPermission = await this.userPermissionsRepository.create({
			permission_id,
			user_id,
		});

		return newUserPermission;
	}

	async executeUpdate({ permission_id, user_id }: IRequest): Promise<UpdateResult> {
		const userPermissionUpdate = await this.userPermissionsRepository.update({
			permission_id,
			user_id,
		});

		return userPermissionUpdate;
	}

	async executeDelete({ permission_id, user_id }: IRequest): Promise<DeleteResult> {
		const deleteUserPermission = await this.userPermissionsRepository.delete({
			permission_id,
			user_id,
		});

		return deleteUserPermission;
	}

	async executeIndex(): Promise<UserPermissions[]> {
		const usersPermissions = await this.userPermissionsRepository.index();

		return usersPermissions;
	}

	async executeIndexByUserId(user_id: number): Promise<UserPermissions[]> {
		const userPermissions = await this.userPermissionsRepository.indexByUserId(user_id);

		return userPermissions;
	}
}

export { UsersPermissionsUseCase };

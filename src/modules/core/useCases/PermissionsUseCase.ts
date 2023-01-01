import { inject, injectable } from 'tsyringe';
import { Permission } from '../../entities/Permission';
import { PermissionsRepository } from '../../repositories/implementations/PermissionsRepository';
import { IPermissionRepository } from '../../repositories/IPermissionRepository';

@injectable()
class PermissionsUseCase {
	constructor(
		@inject(PermissionsRepository)
		private permissionsRepository: IPermissionRepository
	) {}

	async executeIndex(value: string): Promise<Permission[]> {
		const permissions = await this.permissionsRepository.index(value);

		return permissions;
	}

	async executeIndexByValue(value: string): Promise<Permission> {
		const permission = await this.permissionsRepository.indexByValue(value);

		return permission;
	}

	async executeIndexById(id: number): Promise<Permission> {
		const permission = await this.permissionsRepository.indexById(id);

		return permission;
	}
}

export { PermissionsUseCase };

import { Repository } from 'typeorm';

import { Permission } from '../../entities/Permission';
import AppDataSource from '../../../database/data-source';
import { IPermissionRepository } from '../IPermissionRepository';

class PermissionsRepository implements IPermissionRepository {
	private repository: Repository<Permission>;

	constructor() {
		this.repository = AppDataSource.getRepository(Permission);
	}

	async index(value: string): Promise<Permission[]> {
		let permissionsQuery = await this.repository.createQueryBuilder('p');

		if (value) {
			permissionsQuery.where('value = :value', { value });
		}

		const permissions = await permissionsQuery.getMany();

		return permissions;
	}

	async indexByValue(value: string): Promise<Permission> {
		const permission = await this.repository.findOneBy({ value });

		return permission;
	}

	async indexById(id: number): Promise<Permission> {
		const permission = await this.repository.findOneBy({ id });

		return permission;
	}
}

export { PermissionsRepository };

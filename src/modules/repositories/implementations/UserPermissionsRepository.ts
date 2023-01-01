import { DeleteResult, Repository, UpdateResult } from 'typeorm';

import AppDataSource from '../../../database/data-source';
import { UserPermissions } from '../../entities/UserPermissions';
import { ICreateUsersPermissionsDTO, IUserPermissionsRepository } from '../IUserPermissionsRepository';

class UserPermissionsRepository implements IUserPermissionsRepository {
	private repository: Repository<UserPermissions>;

	constructor() {
		this.repository = AppDataSource.getRepository(UserPermissions);
	}

	async create({ permission_id, user_id }: ICreateUsersPermissionsDTO): Promise<UserPermissions> {
		const userPermissions = this.repository.create({
			permission_id,
			user_id,
		});

		await this.repository.save(userPermissions);

		return userPermissions;
	}

	async update({ permission_id, user_id }: ICreateUsersPermissionsDTO): Promise<UpdateResult> {
		const updateUserPermissions = await this.repository
			.createQueryBuilder()
			.update(UserPermissions)
			.set({
				permission_id,
			})
			.where('user_id = :user_id', { user_id })
			.returning('*')
			.execute()
			.finally();

		return updateUserPermissions;
	}

	async delete({ permission_id, user_id }: ICreateUsersPermissionsDTO): Promise<DeleteResult> {
		const deleted = await this.repository
			.createQueryBuilder()
			.delete()
			.from(UserPermissions)
			.where('permission_id = :permission_id', { permission_id })
			.andWhere('user_id = :user_id', { user_id })
			.execute()
			.finally();

		return deleted;
	}

	async index(): Promise<UserPermissions[]> {
		const usersPermissions = await this.repository.find({
			relations: ['permission'],
		});

		return usersPermissions;
	}

	async indexByUserId(user_id: number): Promise<UserPermissions[]> {
		const userPermissions = await this.repository.find({
			relations: ['permission'],
			where: { user_id },
		});

		return userPermissions;
	}
}

export { UserPermissionsRepository };

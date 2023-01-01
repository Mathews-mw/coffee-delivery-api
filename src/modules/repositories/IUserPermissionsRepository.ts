import { DeleteResult, UpdateResult } from 'typeorm';
import { UserPermissions } from '../entities/UserPermissions';

export interface ICreateUsersPermissionsDTO {
	permission_id: number;
	user_id: number;
}

export interface IUserPermissionsRepository {
	create({ permission_id, user_id }: ICreateUsersPermissionsDTO): Promise<UserPermissions>;
	update({ permission_id, user_id }: ICreateUsersPermissionsDTO): Promise<UpdateResult>;
	delete({ permission_id, user_id }: ICreateUsersPermissionsDTO): Promise<DeleteResult>;
	index(): Promise<UserPermissions[]>;
	indexByUserId(user_id: number): Promise<UserPermissions[]>;
}

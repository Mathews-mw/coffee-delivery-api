import { Permission } from '../entities/Permission';

export interface IPermissionRepository {
	index(value: string): Promise<Permission[]>;
	indexByValue(value: string): Promise<Permission>;
	indexById(id: number): Promise<Permission>;
}

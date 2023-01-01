import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Permission } from './Permission';
import { User } from './User';

@Entity('users_permissions')
class UserPermissions {
	@PrimaryColumn()
	id: number;

	@Column()
	permission_id: number;

	@ManyToOne(() => Permission, (permission) => permission.id)
	@JoinColumn({ name: 'permission_id' })
	permission: Permission[];

	@Column()
	user_id: number;

	@ManyToOne(() => User, (user) => user.id)
	@JoinColumn({ name: 'user_id' })
	user: User;
}

export { UserPermissions };

import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('permissions')
class Permission {
	@PrimaryColumn()
	id: number;

	@Column()
	value: string;
}

export { Permission };

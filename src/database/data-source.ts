import 'reflect-metadata';

import { DataSource } from 'typeorm';

import { Tag } from '../modules/entities/Tag';
import { User } from '../modules/entities/User';
import { Order } from '../modules/entities/Order';
import { Product } from '../modules/entities/Product';
import { Checkout } from '../modules/entities/Checkout';
import { UserTokens } from '../modules/entities/UserTokens';
import { Permission } from '../modules/entities/Permission';
import { UserPermissions } from '../modules/entities/UserPermissions';

const AppDataSource = new DataSource({
	type: 'postgres',
	host: 'localhost',
	port: 5432,
	username: 'docker',
	password: 'Coffee@2490195',
	database: 'coffee_delivery',
	synchronize: false,
	logging: false,
	entities: [User, Product, Tag, Order, Checkout, UserTokens, Permission, UserPermissions],
	migrations: ['./src/database/migrations/*.ts', './src/database/migrations/seeds/*.ts'],
	subscribers: [],
});

export function createConnection(): Promise<DataSource> {
	return AppDataSource.setOptions({
		database: 'coffee_delivery',
	}).initialize();
}

export default AppDataSource;

import 'reflect-metadata';

import { DataSource } from 'typeorm';

import { Tag } from '../modules/entities/Tag';
import { User } from '../modules/entities/User';
import { Order } from '../modules/entities/Order';
import { Product } from '../modules/entities/Product';
import { Checkout } from '../modules/entities/Checkout';

const AppDataSource = new DataSource({
	type: 'postgres',
	host: 'localhost',
	port: 5432,
	username: 'docker',
	password: 'Coffee@2490195',
	database: 'coffee_delivery',
	synchronize: false,
	logging: false,
	entities: [User, Product, Tag, Order, Checkout],
	migrations: ['./src/database/migrations/*.ts'],
	subscribers: [],
});

export function createConnection(host = 'database'): Promise<DataSource> {
	return AppDataSource.setOptions({ host }).initialize();
}

export default AppDataSource;

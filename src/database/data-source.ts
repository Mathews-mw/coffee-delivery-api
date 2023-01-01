import 'reflect-metadata';
import 'dotenv/config';

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
	host: process.env.NODE_ENV === 'development' ? `${process.env.TYPEORM_DEV_HOST}` : `${process.env.TYPEORM_PROD_HOST}`,
	port: process.env.NODE_ENV === 'development' ? Number(process.env.TYPEORM_DEV_PORT) : Number(process.env.TYPEORM_PROD_PORT),
	username: process.env.NODE_ENV === 'development' ? `${process.env.TYPEORM_DEV_USERNAME}` : `${process.env.TYPEORM_PROD_USERNAME}`,
	password: process.env.NODE_ENV === 'development' ? `${process.env.TYPEORM_DEV_PASSWORD}` : `${process.env.TYPEORM_PROD_PASSWORD}`,
	database: process.env.NODE_ENV === 'development' ? `${process.env.TYPEORM_DEV_DATABASE}` : `${process.env.TYPEORM_PROD_DATABASE}`,
	synchronize: false,
	logging: false,
	entities: [User, Product, Tag, Order, Checkout, UserTokens, Permission, UserPermissions],
	migrations: process.env.NODE_ENV === 'development' ? [`${process.env.TYPEORM_DEV_MIGRATIONS}`] : [`${process.env.TYPEORM_PROD_MIGRATIONS}`],
	subscribers: [],
});

export function createConnection(): Promise<DataSource> {
	return AppDataSource.setOptions({
		database: process.env.NODE_ENV === 'development' ? `${process.env.DB_DEV_DATABASE}` : `${process.env.DB_PROD_DATABASE}`,
	}).initialize();
}

export default AppDataSource;

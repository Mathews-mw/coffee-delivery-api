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

interface IEnvVariables {
	host: string;
	port: number;
	username: string;
	password: string;
	database: string;
	migrations: string;
	seeds: string;
}

function getAcessKeys(EnvVarMode: string) {
	switch (EnvVarMode) {
		case 'development':
			return {
				host: `${process.env.DB_DEV_HOST}`,
				port: Number(process.env.DB_DEV_PORT),
				username: `${process.env.DB_DEV_USERNAME}`,
				password: `${process.env.DB_DEV_PASSWORD}`,
				database: `${process.env.DB_DEV_DATABASE}`,
				migrations: `${process.env.APP_DEV_MIGRATIONS_PATH}`,
				seeds: `${process.env.APP_DEV_SEEDS_PATH}`,
			};
		case 'production':
			return {
				host: `${process.env.DB_PROD_HOST}`,
				port: Number(process.env.DB_PROD_PORT),
				username: `${process.env.DB_PROD_USERNAME}`,
				password: `${process.env.DB_PROD_PASSWORD}`,
				database: `${process.env.DB_PROD_DATABASE}`,
				migrations: `${process.env.APP_PROD_MIGRATIONS_PATH}`,
				seeds: `${process.env.APP_PROD_SEEDS_PATH}`,
			};
		default:
			return null;
	}
}

const setVariables = getAcessKeys(process.env.NODE_ENV);

const AppDataSource = new DataSource({
	type: 'postgres',
	host: setVariables.host,
	port: setVariables.port,
	username: setVariables.username,
	password: setVariables.password,
	database: setVariables.database,
	synchronize: false,
	logging: false,
	entities: [User, Product, Tag, Order, Checkout, UserTokens, Permission, UserPermissions],
	migrations: [`${setVariables.migrations}`, `${setVariables.seeds}`],
	subscribers: [],
});

export function createConnection(): Promise<DataSource> {
	return AppDataSource.setOptions({
		database: setVariables.database,
	}).initialize();
}

export default AppDataSource;

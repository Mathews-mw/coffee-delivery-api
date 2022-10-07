import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { User } from '../modules/accounts/entities/User';

const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "docker",
  password: "Coffee@2490195",
  database: "coffee_delivery",
  synchronize: false,
  logging: false,
  entities: [User],
  migrations: ["./src/database/migrations/*.ts"],
  subscribers: [],
})

export function createConnection(host = "database"): Promise<DataSource> {
  return AppDataSource.setOptions({ host }).initialize();
}

export default AppDataSource
import { UpdateResult } from 'typeorm';
import { User } from '../entities/User';

export interface ICreateUserDTO {
	name: string;
	email: string;
	cpf: string;
	phone_number: string;
	password: string;
	confirm_password: string;
}

export interface IUserRepository {
	create(data: ICreateUserDTO): Promise<void>;
	findByCPF(cpf: string): Promise<User>;
	findByID(id: number): Promise<User>;
	findByEmail(email: string): Promise<User>;
	getAllUsers(): Promise<User[]>;
	updateUser({ id, name, email, phone_number }): Promise<UpdateResult>;
	UpdateUserAvatar(id: number, avatar_file: string): Promise<UpdateResult>;
}

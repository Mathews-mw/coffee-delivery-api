import { Repository, UpdateResult } from 'typeorm';
import { instanceToInstance } from 'class-transformer';
import { hash } from 'bcryptjs';
import AppDataSource from '../../../database/data-source';
import { User } from '../../entities/User';
import { ICreateUserDTO, IUserRepository } from '../IUserRepository';
import { format } from 'date-fns';

class UserRepository implements IUserRepository {
	private repository: Repository<User>;

	constructor() {
		this.repository = AppDataSource.getRepository(User);
	}

	async create(data: ICreateUserDTO): Promise<void> {
		const { name, phone_number, email, cpf, password, confirm_password } = data;

		const hashPassword = await hash(password, 8);
		const hashConfirmPassword = await hash(confirm_password, 8);

		const newUser = this.repository.create({
			name,
			email,
			phone_number,
			cpf,
			password: hashPassword,
			confirm_password: hashConfirmPassword,
			isAdmin: false,
			created_at: new Date(),
			updated_at: new Date(),
		});

		await this.repository.save(newUser);
	}

	async updateUser({ id, name, email, phone_number }): Promise<UpdateResult> {
		const updateUser = await this.repository
			.createQueryBuilder()
			.update(User)
			.set({
				name: name,
				email: email,
				phone_number: phone_number,
				updated_at: new Date(),
			})
			.where('id = :id', { id: id })
			.execute()
			.finally();

		return updateUser;
	}

	async UpdateUserAvatar(id: number, avatar_file: string): Promise<UpdateResult> {
		const updateUserAvatar = await this.repository
			.createQueryBuilder()
			.update(User)
			.set({
				avatar: avatar_file,
				updated_at: format(new Date(), 'yyyy-MM-dd'),
			})
			.where('id = :id', { id })
			.execute()
			.finally();

		return updateUserAvatar;
	}

	async makeAdmin(cpf: string): Promise<UpdateResult> {
		const becomeAdmin = await this.repository
			.createQueryBuilder()
			.update(User)
			.set({
				isAdmin: true,
			})
			.where('cpf = :cpf', { cpf })
			.execute()
			.finally();

		return becomeAdmin;
	}

	async getAllUsers(): Promise<User[]> {
		const users = await this.repository.find();

		return users;
	}

	async findByCPF(cpf: string): Promise<User> {
		const user = await this.repository.findOneBy({ cpf });

		return user;
	}

	async findByID(id: number): Promise<User> {
		const user = await this.repository.findOneBy({ id });

		return user;
	}

	async findByEmail(email: string): Promise<User> {
		const user = await this.repository.findOneBy({ email });

		return user;
	}
}

export { UserRepository };

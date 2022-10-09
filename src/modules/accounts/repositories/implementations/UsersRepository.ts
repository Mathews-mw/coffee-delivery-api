import { Repository } from 'typeorm';
import { hash } from 'bcryptjs';
import AppDataSource from '../../../../database/data-source';
import { User } from '../../entities/User';
import { ICreateUserDTO, IUserRepository } from '../IUserRepository';

class UserRepository implements IUserRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = AppDataSource.getRepository(User);
  }

  async create(data: ICreateUserDTO): Promise<void> {
    const {
      name,
      phone_number,
      email,
      cpf,
      password,
      confirm_password,
      avatar,
    } = data;

    const hashPassword = await hash(password, 8);
    const hashConfirmPassword = await hash(confirm_password, 8);

    const newUser = this.repository.create({
      name,
      email,
      phone_number,
      cpf,
      password: hashPassword,
      confirm_password: hashConfirmPassword,
      avatar,
      isAdmin: false,
      created_at: new Date(),
      updated_at: new Date(),
    });

    await this.repository.save(newUser);
  }

  async findByCPF(cpf: string): Promise<User> {
    const user = await this.repository.findOneBy({ cpf });

    return user;
  }

  async findByID(id: string): Promise<User> {
    const user = await this.repository.findOneBy({ id });

    return user;
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.repository.findOneBy({ email });

    return user;
  }

  async updateUser({ id, name, email, phone_number }): Promise<void> {
    console.log(id);
    await this.repository
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

    return;
  }

  async UpdateUserAvatar(
    recivedUser: User,
    avatar_file: string
  ): Promise<void> {
    recivedUser.avatar = avatar_file;
    recivedUser.updated_at = new Date();

    return;
  }

  async getAllUsers(): Promise<User[]> {
    const users = await this.repository.find();

    return users;
  }
}

export { UserRepository };

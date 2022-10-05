import { User } from "../entities/User";

export interface ICreateUserDTO {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  avatar?: string;
}

export interface IUserRepository {
  create(data: ICreateUserDTO): void;
  findByEmail(email: string): User;
  findByID(id: string): User;
  getAllUsers(): User[];
  updateUser(recivedUser: User, { name, email }): User;
  UpdateUserAvatar(recivedUser: User, avatar_file: string): User
}
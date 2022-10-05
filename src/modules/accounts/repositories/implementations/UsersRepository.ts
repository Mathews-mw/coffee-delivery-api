import { User } from "../../entities/User";
import { ICreateUserDTO, IUserRepository } from "../IUserRepository";

class UserRepository implements IUserRepository {

  private users: User[];

  private static INSTANCE: UserRepository;

  constructor() {
    this.users = [];
  }

  public static getInstance(): IUserRepository {
    if (!this.INSTANCE) {
      UserRepository.INSTANCE = new UserRepository()
    }

    return UserRepository.INSTANCE;
  }

  create(data: ICreateUserDTO): void {
    const { name, password, email, confirmPassword, avatar } = data;

    const user = new User()

    Object.assign(user, {
      name,
      email,
      password,
      isAdmin: false,
      confirmPassword,
      avatar,
      created_at: new Date(),
      updated_at: new Date(),
    });

    this.users.push(user);
  };

  findByEmail(email: string): User {
    const user = this.users.find(user => user.email === email);

    return user
  };

  findByID(id: string): User {
    const user = this.users.find(user => user.id === id);

    return user
  }

  updateUser(recivedUser: User, { name, email }): User {
    recivedUser.name = name;
    recivedUser.avatar = email;
    recivedUser.updated_at = new Date();

    return null;
  };

  UpdateUserAvatar(recivedUser: User, avatar_file: string): User {
    recivedUser.avatar = avatar_file;
    recivedUser.updated_at = new Date();

    return
  }

  getAllUsers(): User[] {
    const users = this.users;

    return users
  }

};

export { UserRepository };

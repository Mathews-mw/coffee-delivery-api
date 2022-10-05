import { deleteFile } from "../../../../utils/fileManager";
import { User } from "../../entities/User";
import { IUserRepository } from "../../repositories/IUserRepository";

interface IRequest {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface IUpdateRequest {
  id: string;
  name: string;
  email: string
}

class UserUseCase {

  constructor(private userRepository: IUserRepository) { }

  execute(data: IRequest) {
    const { name, email, password, confirmPassword } = data;

    this.userRepository.create({ name, email, password, confirmPassword });
  }

  executeListAllUsers(email): User[] {
    const allUsers = this.userRepository.getAllUsers()

    const user = this.userRepository.findByEmail(email)
    if (!user) {
      throw new Error("Usuário não existe na base de dados")
    }

    return allUsers;
  }

  executeFindByEmail(email: string): User {
    const user = this.userRepository.findByEmail(email);

    if (!user) {
      throw new Error('User not found!');
    }

    return user
  }

  executeUpdateUser({ id, name, email }: IUpdateRequest): User {
    const user = this.userRepository.findByID(id);
    if (!user) {
      throw new Error("User not found!");
    }

    if (user.avatar) {

    }

    this.userRepository.updateUser(user, { name, email });

    return;
  }

  executeUpdateUseravatar(id: string, avatar_file: string): User {
    const user = this.userRepository.findByID(id);

    if (!user) {
      throw new Error('User not found!');
    }

    if (user.avatar) {
      deleteFile(`./tmp/avatar/${user.avatar}`);
    }

    this.userRepository.UpdateUserAvatar(user, avatar_file);

    return
  }
}

export { UserUseCase };
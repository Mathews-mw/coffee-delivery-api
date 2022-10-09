import { UserRepository } from '../../repositories/implementations/UsersRepository';
import { UserController } from './UserController';
import { UserUseCase } from './UserUseCase';

const userRepository = new UserRepository();
const userUseCase = new UserUseCase(userRepository);
const userController = new UserController(userUseCase);

export { userController };

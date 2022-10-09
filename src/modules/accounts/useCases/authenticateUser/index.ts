import { UserRepository } from '../../repositories/implementations/UsersRepository';
import { AuthUserController } from './AuthUserController';
import { AuthUserUseCase } from './AuthUserUSeCase';

const userRepository = new UserRepository();
const authUserUseCase = new AuthUserUseCase(userRepository);
const authUserController = new AuthUserController(authUserUseCase);

export { authUserController };

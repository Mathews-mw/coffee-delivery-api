import { UserRepository } from "../../repositories/implementations/UsersRepository";
import { UserController } from "./UserController";
import { UserUseCase } from "./UserUseCase";

const useRepositpry = new UserRepository()
const userUseCase = new UserUseCase(useRepositpry);
const userController = new UserController(userUseCase);

export { userController };
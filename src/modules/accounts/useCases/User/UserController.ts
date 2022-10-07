import { Request, Response } from "express"
import { UserUseCase } from "./UserUseCase"

class UserController {

  constructor(private userCase: UserUseCase) { }

  async handleCreate(request: Request, response: Response): Promise<Response> {
    const { name, email, phone_number, cpf, password, confirm_password, avatar } = request.body

    await this.userCase.executeCreate({ name, email, phone_number, cpf, password, confirm_password, avatar });

    return response.json({ message: "Usuário criado com sucesso!" });
  }

  async handleListAllUsers(request: Request, response: Response): Promise<Response> {
    const { cpf } = request.headers
    const users = await this.userCase.executeListAllUsers(cpf);

    return response.json(users);
  }

  async handleFindByCPF(request: Request, response: Response): Promise<Response> {
    const { cpf } = request.params

    const user = await this.userCase.executeFindByCPF(cpf);
    if (!user) {
      return response.json({ message: "erro ao tentar encontrar usuário!" })
    }

    return response.json(user);
  }

  async handleUpdateUser(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { name, email, phone_number } = request.body;
    console.log(id)

    await this.userCase.executeUpdateUser({ id, name, email, phone_number });

    return response.json({ message: "User sucess updated!" });
  }

  async handleUpdateUserAvatar(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const avatar_file = request.file.filename;

    await this.userCase.executeUpdateUseravatar(id, avatar_file)

    return response.status(204).json({ message: "User avatar sucess updated!" });
  }
}

export { UserController }
import { Request, Response } from "express"
import { UserUseCase } from "./UserUseCase"

class UserController {

  constructor(private userCase: UserUseCase) { }

  handle(request: Request, response: Response): Response {
    const { name, email, password, confirmPassword } = request.body

    this.userCase.execute({ name, email, password, confirmPassword })
    return response.send()
  }

  handleListAllUsers(request: Request, response: Response): Response {
    const { email } = request.headers
    const users = this.userCase.executeListAllUsers(email)

    if (!users) {
      response.json({ message: "Usuário não encontrado na base de dados" })
    }

    return response.json(users);
  }

  handleFindByEmail(request: Request, response: Response): Response {
    const { email } = request.params

    const user = this.userCase.executeFindByEmail(email);
    if (!user) {
      return response.json({ message: "erro ao tentar encontrar usuário!" })
    }

    return response.json(user)
  }

  handleUpdateUser(request: Request, response: Response): Response {
    const { id } = request.params;
    const { name, email } = request.body;

    this.userCase.executeUpdateUser({ id, name, email });

    return response.json({ message: "User sucess updated!" });
  }

  handleUpdateUserAvatar(request: Request, response: Response): Response {
    const { id } = request.params;
    const avatar_file = request.file.filename;

    this.userCase.executeUpdateUseravatar(id, avatar_file)

    return response.status(204).send();
  }
}

export { UserController }
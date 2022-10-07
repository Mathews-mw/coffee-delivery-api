import { Request, Response } from "express";
import { AuthUserUseCase } from "./AuthUserUSeCase";

class AuthUserController {
  constructor(private userUseCase: AuthUserUseCase) { }

  async handle(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const token = await this.userUseCase.execute({ email, password });

    return response.json(token);
  }
};

export { AuthUserController };

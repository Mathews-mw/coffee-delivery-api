import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { UserUseCase } from '../useCases/UserUseCase';
import { HandleErrors } from '../../../shared/errors/HandleErrors';
import { readImageFile } from '../../../utils/fileManager';

class UserController {
	async handleCreate(request: Request, response: Response): Promise<Response> {
		const { name, email, phone_number, cpf, password, confirm_password, avatar } = request.body;

		const userUseCase = container.resolve(UserUseCase);

		try {
			await userUseCase.executeCreate({
				name,
				email,
				phone_number,
				cpf,
				password,
				confirm_password,
				avatar,
			});

			return response.status(201).json({ message: 'Usuário criado com sucesso!' });
		} catch (error) {
			const alredyExists = await userUseCase.executeFindByCPF(cpf);
			if (alredyExists) {
				return response.status(404).json({ message: 'Usuário já cadastrado!' });
			}
			console.log(error);
			return response.status(500).json({ message: 'Erro ao tentar criar usuário!' });
		}
	}

	async handleListAllUsers(request: Request, response: Response): Promise<Response> {
		const userUseCase = container.resolve(UserUseCase);

		const users = await userUseCase.executeListAllUsers();

		return response.json(users);
	}

	async handleFindByCPF(request: Request, response: Response): Promise<Response> {
		const { cpf } = request.params;

		const userUseCase = container.resolve(UserUseCase);
		try {
			const user = await userUseCase.executeFindByCPF(cpf);

			if (!user) {
				return response.json({ message: 'nenhum usuário encontrado' });
			}

			return response.json(user);
		} catch (error) {
			response.status(404).json({ message: 'Erro ao tentar listar usuário' });
		}
	}

	async handleUpdateUser(request: Request, response: Response): Promise<Response> {
		const { id } = request.params;
		const { name, email, phone_number } = request.body;

		const userUseCase = container.resolve(UserUseCase);
		await userUseCase.executeUpdateUser({ id, name, email, phone_number });

		return response.json({ message: 'User sucess updated!' });
	}

	async handleUpdateUserAvatar(request: Request, response: Response): Promise<Response> {
		const { id } = request.params;
		const avatar_file = request.file.filename;
		console.log(avatar_file);

		const userUseCase = container.resolve(UserUseCase);
		await userUseCase.executeUpdateUseravatar(id, avatar_file);

		return response.status(204).json({ message: 'User avatar sucess updated!' });
	}
}

export { UserController };

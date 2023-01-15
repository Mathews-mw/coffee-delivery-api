import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { UsersPermissionsUseCase } from '../useCases/UsersPermissionsUseCase';
import { UserUseCase } from '../useCases/UserUseCase';

class UserController {
	async handleCreate(request: Request, response: Response): Promise<Response> {
		const { name, email, phone_number, cpf, password, confirm_password } = request.body;

		const userUseCase = container.resolve(UserUseCase);

		try {
			const alredyExists = await userUseCase.executeFindByCPF(cpf);

			if (alredyExists) {
				return response.status(404).json({ message: 'Usuário já cadastrado!' });
			}

			await userUseCase.executeCreate({
				name,
				email,
				phone_number,
				cpf,
				password,
				confirm_password,
			});

			return response.status(201).json({ message: 'Usuário criado com sucesso!' });
		} catch (error) {
			console.log(error);
			return response.status(500).json({ message: 'Erro ao tentar criar usuário!' });
		}
	}

	async handleUpdateUser(request: Request, response: Response): Promise<Response> {
		const { id } = request.params;
		const { name, email, phone_number } = request.body;

		const userUseCase = container.resolve(UserUseCase);

		try {
			const updateUser = await userUseCase.executeUpdateUser({ id, name, email, phone_number });

			if (updateUser.affected === 0) {
				return response.status(404).json({ error: 'Nenhum usuário foi atualizado' });
			}

			return response.json({ message: 'User sucess updated!' });
		} catch (error) {
			console.log(error);
		}
	}

	async handleUpdateUserAvatar(request: Request, response: Response): Promise<Response> {
		const { id } = request.user;
		const avatar_file = request.file.filename;

		const userUseCase = container.resolve(UserUseCase);

		try {
			const updated = await userUseCase.executeUpdateUseravatar(id, avatar_file);

			if (updated.affected === 0) {
				return response.status(404).json({ error: 'Nenhuma atualização foi realizada' });
			}

			return response.status(200).json({ message: 'User avatar sucess updated!', content: avatar_file });
		} catch (error) {
			console.log(error);
			return response.status(400).json({ error: 'Erro ao tentar inserir avatar' });
		}
	}

	async handleMakeAdmin(request: Request, response: Response): Promise<Response> {
		const { id } = request.user;
		const { cpf } = request.body;

		const userUseCase = container.resolve(UserUseCase);
		const userPermissionsUseCase = container.resolve(UsersPermissionsUseCase);

		try {
			const userPermissions = await userPermissionsUseCase.executeIndexByUserId(Number(id));
			const hasPermissions = userPermissions.find((userPermission: any) => {
				return userPermission.permission.value === 'permissions-modify';
			});

			if (!hasPermissions) {
				return response.status(401).json({ error: 'Você não tem permissão para essa ação' });
			}

			const updatedToAdmin = await userUseCase.executeMakeAdmin(cpf);

			if (updatedToAdmin.affected === 0) {
				return response.status(404).json({ error: 'Nenhuma atribuição feita' });
			}

			return response.status(200).json({ message: 'Permissão de admin atribuída com sucesso' });
		} catch (error) {
			console.log(error);
			return response.status(400).json({ error: 'Erro ao tentar atribuir admin' });
		}
	}

	async handleListAllUsers(request: Request, response: Response): Promise<Response> {
		const userUseCase = container.resolve(UserUseCase);

		const users = await userUseCase.executeListAllUsers();

		users.forEach((user) => {
			delete user.password;
			delete user.confirm_password;
		});

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

			delete user.password;
			delete user.confirm_password;

			return response.json(user);
		} catch (error) {
			console.log(error);
			response.status(404).json({ message: 'Erro ao tentar listar usuário' });
		}
	}
}

export { UserController };

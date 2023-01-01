import { container } from 'tsyringe';
import { Request, Response } from 'express';

import { UsersPermissionsUseCase } from '../useCases/UsersPermissionsUseCase';

class UsersPermissionsController {
	async handleCreate(request: Request, response: Response): Promise<Response> {
		const { permission_id, user_id } = request.body;
		const usersPermissionsUseCase = container.resolve(UsersPermissionsUseCase);

		try {
			const userPermissions = await usersPermissionsUseCase.executeIndexByUserId(Number(user_id));
			const permissionsAlredyExist = userPermissions.find((permission) => permission.id === Number(permission_id));

			if (permissionsAlredyExist) {
				return response.status(400).json({ error: 'Usuário já possui esta permissão' });
			}

			const userNewPermissions = await usersPermissionsUseCase.executeCreate({
				permission_id,
				user_id,
			});

			if (!userNewPermissions) {
				return response.status(404).json({ error: 'Nenhuma permissão foi inserida' });
			}

			return response.json({ message: 'Permissão concedida com sucesso' });
		} catch (error) {
			console.log(error);
			return response.status(400).json({ error: 'Erro ao tentar inserir permissão' });
		}
	}

	async handleUpdate(request: Request, response: Response): Promise<Response> {
		const { permission_id, user_id } = request.body;
		const usersPermissionsUseCase = container.resolve(UsersPermissionsUseCase);

		try {
			const updatedPermission = await usersPermissionsUseCase.executeUpdate({
				permission_id: Number(permission_id),
				user_id: Number(user_id),
			});

			if (updatedPermission.affected === 0) {
				return response.status(404).json({ error: 'Nenhuma permissão foi alterada' });
			}

			return response.json({ message: 'Permissão alterada com sucesso' });
		} catch (error) {
			console.log(error);
			return response.status(400).json({ error: 'Erro ao tentar alterar permissão' });
		}
	}

	async handleDelete(request: Request, response: Response): Promise<Response> {
		const { permission_id, user_id } = request.body;
		const usersPermissionsUseCase = container.resolve(UsersPermissionsUseCase);

		try {
			const deletedPermission = await usersPermissionsUseCase.executeDelete({
				permission_id: Number(permission_id),
				user_id: Number(user_id),
			});

			if (deletedPermission.affected === 0) {
				return response.status(404).json({ error: 'Nenhuma permissão foi deleteada' });
			}

			return response.json({ message: 'Permissão removida com sucesso' });
		} catch (error) {
			console.log(error);
			return response.status(400).json({ error: 'Erro ao remover permissão' });
		}
	}

	async handleIndex(request: Request, response: Response): Promise<Response> {
		const usersPermissionsUseCase = container.resolve(UsersPermissionsUseCase);

		try {
			const usersPermissions = await usersPermissionsUseCase.executeIndex();

			if (!usersPermissions) {
				return response.status(404).json({ error: 'Nenhum registro encontrado' });
			}

			return response.json(usersPermissions);
		} catch (error) {
			console.log(error);
			return response.status(400).json({ error: 'Erro ao tentar listar permissões dos usuários' });
		}
	}

	async handleIndexUserId(request: Request, response: Response): Promise<Response> {
		const { user_id } = request.params;
		const usersPermissionsUseCase = container.resolve(UsersPermissionsUseCase);

		try {
			const userPermissions = await usersPermissionsUseCase.executeIndexByUserId(Number(user_id));

			if (!userPermissions) {
				return response.status(404).json({ error: 'Nenhum registro encontrado' });
			}

			return response.json(userPermissions);
		} catch (error) {
			console.log(error);
			return response.status(400).json({ error: 'Erro ao tentar listar permissões do usuário' });
		}
	}
}

export { UsersPermissionsController };

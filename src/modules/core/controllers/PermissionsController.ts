import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { PermissionsUseCase } from '../useCases/PermissionsUseCase';

class PermissionsController {
	async handleIndex(request: Request, response: Response): Promise<Response> {
		const { value } = request.query;
		const permissionUseCase = container.resolve(PermissionsUseCase);

		try {
			const permissions = await permissionUseCase.executeIndex(value as string);

			if (!permissions) {
				return response.status(404).json({ error: 'Nenhuma permissão encontrada' });
			}

			return response.json(permissions);
		} catch (error) {
			console.log(error);
			return response.status(400).json({ error: 'Erro ao tentar listar permissões' });
		}
	}

	async handleIndexByValue(request: Request, response: Response): Promise<Response> {
		const { value } = request.query;
		const permissionUseCase = container.resolve(PermissionsUseCase);

		try {
			const permission = await permissionUseCase.executeIndexByValue(value as string);

			if (!permission) {
				return response.status(404).json({ error: 'Nenhuma permissão encontrada' });
			}

			return response.json(permission);
		} catch (error) {
			console.log(error);
			return response.status(400).json({ error: 'Erro ao tentar listar permissões' });
		}
	}

	async handleIndexById(request: Request, response: Response): Promise<Response> {
		const { id } = request.params;
		const permissionUseCase = container.resolve(PermissionsUseCase);

		try {
			const permission = await permissionUseCase.executeIndexById(Number(id));

			if (!permission) {
				return response.status(404).json({ error: 'Nenhuma permissão encontrada' });
			}

			return response.json(permission);
		} catch (error) {
			console.log(error);
			return response.status(400).json({ error: 'Erro ao tentar listar permissões' });
		}
	}
}

export { PermissionsController };

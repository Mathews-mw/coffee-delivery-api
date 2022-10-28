import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { TagUseCase } from '../useCases/TagUseCase';

class TagController {
	async handleCreate(request: Request, response: Response): Promise<Response> {
		const tags = request.body;

		const tagUseCase = container.resolve(TagUseCase);

		await tagUseCase.executeCreate(tags);

		return response.status(201).json({ message: 'Tags inseridas com sucesso' });
	}

	async handleDelete(request: Request, response: Response): Promise<Response> {
		const { uuid_ref_product, tag } = request.params;

		const tagUseCase = container.resolve(TagUseCase);
		await tagUseCase.executeDelete(uuid_ref_product, tag);

		return response.status(204).json({ message: 'Tag deletada' });
	}

	async handleListAllTags(request: Request, response: Response): Promise<Response> {
		const tagUseCase = container.resolve(TagUseCase);
		const listAlltags = await tagUseCase.executeListAll();

		return response.json(listAlltags);
	}

	async handleListByRef(request: Request, response: Response): Promise<Response> {
		const { ref } = request.params;

		const tagUseCase = container.resolve(TagUseCase);
		const tags = await tagUseCase.executeListByRef(ref);

		return response.json(tags);
	}
}

export { TagController };

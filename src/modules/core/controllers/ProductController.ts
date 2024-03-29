import { container } from 'tsyringe';
import { NextFunction, Request, Response } from 'express';

import { ProductUseCase } from '../useCases/ProductUseCase';

class ProductController {
	async handleCreate(request: Request, response: Response): Promise<Response> {
		const { product_name, price, description, tags, uuid_ref_tag } = request.body;
		const image_name = request.file.filename;

		const productUseCase = container.resolve(ProductUseCase);

		await productUseCase.executeCreate({
			product_name,
			price,
			description,
			tags,
			image_name,
			uuid_ref_tag,
		});

		return response.status(201).json({ message: 'Produto cadastrado com sucesso' });
	}

	async handleUpdate(request: Request, response: Response): Promise<Response> {
		const { ID } = request.params;
		const { product_name, price, description, tags, uuid_ref_tag } = request.body;

		const productUseCase = container.resolve(ProductUseCase);

		try {
			await productUseCase.executeUpdate({
				id: ID,
				product_name,
				price,
				description,
				tags,
				uuid_ref_tag,
			});

			return response.status(200).json({ message: 'Produto atualizado com sucesso' });
		} catch (error) {
			console.log(error);
			return response.status(404).json({ message: 'Ocorreu algum erro durante a operação' });
		}
	}

	async handleUpdateProductImage(request: Request, response: Response): Promise<Response> {
		const { ID } = request.params;
		const image_name = request.file.filename;

		const productUseCase = container.resolve(ProductUseCase);
		try {
			if (!ID) {
				return response.status(400).json({ message: 'Nenhuma imagem atualizada' });
			}

			const idFormatted = Number(ID);
			await productUseCase.updateProductImage(idFormatted, image_name);

			return response.status(200).json({ message: 'Imagem atualizada com sucesso' });
		} catch (error) {
			console.log(error);
			return response.status(404).json({ message: 'Algo deu errado, por favor, tente novamente mais tarde' });
		}
	}

	async handleDelete(request: Request, response: Response): Promise<Response> {
		const { ID } = request.params;

		const productUseCase = container.resolve(ProductUseCase);

		try {
			await productUseCase.executeDelete(ID);
			return response.status(200).json({ message: 'Produto deletado' });
		} catch (error) {
			console.log('handleDelete: ', error);
			return response.status(400).json({ message: 'Erro ao tentar deletar' });
		}
	}

	async handleListAllProducts(request: Request, response: Response, next: NextFunction): Promise<Response> {
		const productUseCase = container.resolve(ProductUseCase);
		const AllProducts = await productUseCase.executeListAll();

		return response.json(AllProducts);
	}

	async handleGetManyProducts(request: Request, response: Response, next: NextFunction): Promise<Response> {
		const pagesAmmount = request.query.pagesAmmount;
		const currentPage = request.query.currentPage;

		const pagesAmmountAsNumber = Number.parseInt(pagesAmmount as string);
		const currentPagAsNumber = Number.parseInt(currentPage as string);

		const productUseCase = container.resolve(ProductUseCase);
		const productsPaginate = await productUseCase.executeGetMany(pagesAmmountAsNumber, currentPagAsNumber);

		const totalPages = Math.ceil(productsPaginate[1] / pagesAmmountAsNumber);
		const currentPageCount = currentPagAsNumber + 1;

		return response.json({
			content: productsPaginate[0],
			totalContent: productsPaginate[1],
			totalPages: totalPages,
			currentPage: currentPageCount,
		});
	}

	async handleListByID(request: Request, response: Response): Promise<Response> {
		const { ID } = request.params;

		const productUseCase = container.resolve(ProductUseCase);

		try {
			const idFormatted = Number(ID);
			const product = await productUseCase.executeFindByID(idFormatted);
			console.log('controller: ', product);

			if (!product) {
				return response.status(404).json({ error: 'Nunhum produto foi encontrado' });
			}

			return response.json(product);
		} catch (error) {
			console.log(error);
			return response.status(400).json({ message: 'Erro ao tentar listar produto!' });
		}
	}
}

export { ProductController };

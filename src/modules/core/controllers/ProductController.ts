import { NextFunction, Request, Response } from 'express';
import { container } from 'tsyringe';
import chalk from 'chalk';
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
		const image_name = request.file.filename;

		const productUseCase = container.resolve(ProductUseCase);

		try {
			await productUseCase.executeUpdate({
				id: ID,
				product_name,
				price,
				description,
				tags,
				image_name,
				uuid_ref_tag,
			});

			return response.status(200).json({ message: 'Produto atualizado com sucesso' });
		} catch (error) {
			console.log(chalk.red(error));
			return response.status(400).json({ message: 'Ocorreu algum erro durante a operação' });
		}
	}

	async handleDelete(request: Request, response: Response): Promise<Response> {
		const { ID } = request.params;
		console.log(ID);

		const productUseCase = container.resolve(ProductUseCase);

		try {
			await productUseCase.executeDelete(ID);
			return response.status(200).json({ message: 'Produto deletado' });
		} catch (error) {
			console.log(error);
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
			totalPages: totalPages,
			currentPage: currentPageCount,
		});
	}
}

export { ProductController };

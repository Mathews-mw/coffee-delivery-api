import chalk from 'chalk';
import { inject, injectable } from 'tsyringe';
import { UpdateResult } from 'typeorm';
import { Product } from '../../entities/Product';
import { ProductsRepository } from '../../repositories/implementations/ProductsRepository';
import { TagsRepository } from '../../repositories/implementations/TagsRepository';
import { IProductRepository } from '../../repositories/IProductRepository';
import { ITagRepository } from '../../repositories/ITagRepository';

interface ITagRequest {
	tag: string;
}

interface IRequest {
	product_name: string;
	price: string;
	description: string;
	tags: string;
	image_name: string;
	uuid_ref_tag: string;
}

interface IUpdateRequest {
	id: string;
	product_name: string;
	price: string;
	description: string;
	tags: string;
	image_name: string;
	uuid_ref_tag: string;
}

@injectable()
class ProductUseCase {
	constructor(
		@inject(ProductsRepository)
		private productRopistory: IProductRepository,
		@inject(TagsRepository)
		private tagRepository: ITagRepository
	) {}

	async executeCreate({ product_name, price, description, tags, image_name, uuid_ref_tag }: IRequest): Promise<Product> {
		const convertTagsToArray = tags.split(',');
		const priceFormatted = Number(price.replace(',', '.'));

		const product = await this.productRopistory.create({
			product_name,
			price: priceFormatted,
			description,
			image_name,
			uuid_ref_tag,
		});

		await convertTagsToArray.map(async (tag) => {
			await this.tagRepository.create({ tag: tag, uuid_ref_product: uuid_ref_tag });
		});

		return product;
	}

	async executeUpdate(data: IUpdateRequest): Promise<UpdateResult> {
		const { id, product_name, price, description, tags, image_name, uuid_ref_tag } = data;

		const convertTagsToArray = tags.split(',');
		const priceFormatted = Number(price.replace(',', '.'));
		const idFormatted = Number(id);

		let currentTagList = await this.tagRepository.listTagsByRef(uuid_ref_tag);

		let tagsToDelete = currentTagList.filter((tag) => convertTagsToArray.filter((item) => tag.tag === item).length === 0);
		let tagsToAdd = convertTagsToArray.filter((item) => currentTagList.filter((tag) => tag.tag === item).length === 0);

		const updateProduct = await this.productRopistory.edit({
			id: idFormatted,
			product_name,
			price: priceFormatted,
			description,
			image_name,
		});

		if (tagsToDelete.length > 0) {
			await Promise.all(
				tagsToDelete.map(async (item) => {
					await this.tagRepository.delete(item.uuid_ref_product, item.tag.trim());
				})
			);
		}

		if (tagsToAdd.length > 0) {
			await Promise.all(
				convertTagsToArray.map(async (tag) => {
					await this.tagRepository.create({ tag: tag.trim(), uuid_ref_product: uuid_ref_tag });
				})
			);
		}

		return updateProduct;
	}

	async executeDelete(id: string): Promise<void> {
		const idFormatted = Number(id);
		await this.productRopistory.delete(idFormatted);
	}

	async executeListAll(): Promise<Product[]> {
		const products = await this.productRopistory.getAll();

		return products;
	}

	async executeGetMany(pagesAmount: number, currentPage: number): Promise<any> {
		let page = 0;

		if (!Number.isNaN(currentPage) && currentPage >= 0) {
			page = currentPage;
		}

		let size = 5;
		if (!Number.isNaN(pagesAmount) && pagesAmount > 0 && pagesAmount <= 20) {
			size = pagesAmount;
		}

		const products = await this.productRopistory.getMany(size, page);

		return products;
	}
}

export { ProductUseCase };

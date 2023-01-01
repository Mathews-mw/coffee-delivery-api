import { UpdateResult } from 'typeorm';
import { inject, injectable } from 'tsyringe';

import { Tag } from '../../entities/Tag';
import { Product } from '../../entities/Product';
import { ITagRepository } from '../../repositories/ITagRepository';
import { IProductRepository } from '../../repositories/IProductRepository';
import { IStorageProvider } from '../../../shared/providers/IStorageProvider';
import { TagsRepository } from '../../repositories/implementations/TagsRepository';
import { ProductsRepository } from '../../repositories/implementations/ProductsRepository';
import { S3StorageProvider } from '../../../shared/providers/implementations/S3StorageProvider';
import { LocalStorageProvider } from '../../../shared/providers/implementations/LocalStorageProvider';

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
	tags: string[];
	uuid_ref_tag: string;
}

interface IProductView {
	id: number;
	product_name: string;
	price: number;
	description: string;
	image_name: string;
	tags: Tag[];
	uuid_ref_tag: string;
	created_at: Date;
	updated_at?: Date;
	image_url: string;
}

const diskStorage = {
	local: LocalStorageProvider,
	s3: S3StorageProvider,
};

@injectable()
class ProductUseCase {
	constructor(
		@inject(ProductsRepository)
		private productRopistory: IProductRepository,
		@inject(TagsRepository)
		private tagRepository: ITagRepository,
		@inject(diskStorage[process.env.disk])
		private storageProvider: IStorageProvider
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

		await Promise.all(
			convertTagsToArray.map(async (tag) => {
				await this.tagRepository.create({ tag: tag, uuid_ref_product: uuid_ref_tag });
			})
		);

		await this.storageProvider.save(image_name, 'productsImages');

		return product;
	}

	async executeUpdate(data: IUpdateRequest): Promise<UpdateResult> {
		const { id, product_name, price, description, tags, uuid_ref_tag } = data;

		const priceFormatted = Number(price.replace(',', '.'));
		const idFormatted = Number(id);

		let currentTagList = await this.tagRepository.listTagsByRef(uuid_ref_tag);

		let tagsToDelete = currentTagList.filter((tag) => tags.filter((item) => tag.tag === item).length === 0);
		let tagsToAdd = tags.filter((item) => currentTagList.filter((tag) => tag.tag === item).length === 0);

		const updateProduct = await this.productRopistory.edit({
			id: idFormatted,
			product_name,
			price: priceFormatted,
			description,
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
				tags.map(async (tag) => {
					await this.tagRepository.create({ tag: tag.trim(), uuid_ref_product: uuid_ref_tag });
				})
			);
		}

		return updateProduct;
	}

	async updateProductImage(ID: number, image_name: string): Promise<UpdateResult> {
		const product = await this.productRopistory.findByID(ID);

		if (product.image_name) {
			await this.storageProvider.delete(product.image_name, 'productsImages');
		}

		const updadeProductImage = await this.productRopistory.editImage(ID, image_name);
		await this.storageProvider.save(image_name, 'productsImages');

		return updadeProductImage;
	}

	async executeDelete(id: string): Promise<void> {
		const idFormatted = Number(id);
		const product = await this.productRopistory.findByID(idFormatted);

		if (product.image_name) {
			await this.storageProvider.delete(product.image_name, 'productsImages');
		}

		await this.productRopistory.delete(idFormatted);
	}

	async executeListAll(): Promise<IProductView[]> {
		const products = await this.productRopistory.getAll();

		const productsView = products.map((product) => {
			return {
				id: product.id,
				product_name: product.product_name,
				price: product.price,
				description: product.description,
				tags: [],
				image_name: product.image_name,
				uuid_ref_tag: product.uuid_ref_tag,
				created_at: product.created_at,
				updated_at: product.updated_at,
				image_url: product.getImageUrl(),
			};
		});

		return productsView;
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

	async executeFindByID(id: number): Promise<IProductView> {
		const productById = await this.productRopistory.findByID(id);
		const tags = await this.tagRepository.listTagsByRef(productById.uuid_ref_tag);

		const productView = {
			id: productById.id,
			product_name: productById.product_name,
			price: productById.price,
			description: productById.description,
			tags: tags,
			image_name: productById.image_name,
			uuid_ref_tag: productById.uuid_ref_tag,
			created_at: productById.created_at,
			updated_at: productById.updated_at,
			image_url: productById.getImageUrl(),
		};

		return productView;
	}
}

export { ProductUseCase };

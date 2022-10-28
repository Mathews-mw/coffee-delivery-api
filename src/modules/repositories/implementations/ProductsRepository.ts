import { Repository, UpdateResult } from 'typeorm';
import AppDataSource from '../../../database/data-source';
import { Product } from '../../entities/Product';
import { ICreateProductDTO, IProductRepository, IUpdateProductDTO } from '../IProductRepository';

class ProductsRepository implements IProductRepository {
	private repository: Repository<Product>;

	constructor() {
		this.repository = AppDataSource.getRepository(Product);
	}

	async create(data: ICreateProductDTO): Promise<Product> {
		const { product_name, price, description, image_name, uuid_ref_tag } = data;

		const newProduct = this.repository.create({
			product_name,
			price,
			description,
			image_name,
			uuid_ref_tag,
			created_at: new Date(),
		});

		await this.repository.save(newProduct);

		return newProduct;
	}

	async edit(data: IUpdateProductDTO): Promise<UpdateResult> {
		const { id, product_name, price, description, image_name } = data;

		const updateProduct = await this.repository
			.createQueryBuilder()
			.update(Product)
			.set({
				product_name: product_name,
				price: price,
				description: description,
				image_name: image_name,
				updated_at: new Date(),
			})
			.where('id = :id', { id: id })
			.execute();

		return updateProduct;
	}

	async delete(id: number): Promise<void> {
		await this.repository.createQueryBuilder().delete().from(Product).where('id = :id', { id: id }).execute();
	}

	async getAll(): Promise<Product[]> {
		const listAllProducts = await this.repository.find();

		return listAllProducts;
	}

	async getMany(takePages: number, skipPages: number): Promise<[Product[], number]> {
		const pagesAmount = takePages;
		const currentPage = skipPages * pagesAmount;

		const products = await this.repository.findAndCount({
			take: takePages,
			skip: currentPage,
		});

		return products;
	}

	async findByID(id: number): Promise<Product> {
		const product = await this.repository.findOneBy({ id });

		return product;
	}
}

export { ProductsRepository };

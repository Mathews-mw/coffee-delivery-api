import { UpdateResult } from 'typeorm';
import { Product } from '../entities/Product';

export interface ICreateProductDTO {
	product_name: string;
	price: number;
	description: string;
	image_name: string;
	uuid_ref_tag: string;
}

export interface IUpdateProductDTO {
	id: number;
	product_name: string;
	price: number;
	description: string;
	image_name: string;
	uuid_ref_tag?: string;
}

export interface IProductRepository {
	create(data: ICreateProductDTO): Promise<Product>;
	edit(data: IUpdateProductDTO): Promise<UpdateResult>;
	delete(id: number): Promise<void>;
	getAll(): Promise<Product[]>;
	getMany(takePages: number, skipPages: number): Promise<[Product[], number]>;
	findByID(id: number): Promise<Product>;
}

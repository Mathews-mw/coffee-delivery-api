import { UpdateResult } from 'typeorm';
import { Tag } from '../entities/Tag';

export interface ICreateTagDTO {
	tag: string;
	uuid_ref_product: string;
}

export interface IUpdateCreateTagDTO {
	tag: string;
	uuid_ref_product: string;
}

export interface ITagRepository {
	create(data: ICreateTagDTO): Promise<Tag>;
	update(data: IUpdateCreateTagDTO): Promise<UpdateResult>;
	delete(uuid_ref_product: string, tag: string): Promise<void>;
	listAllTags(): Promise<Tag[]>;
	listTagsByRef(uuid_ref_product: string): Promise<Tag[]>;
}

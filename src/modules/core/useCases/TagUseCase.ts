import chalk from 'chalk';
import { inject, injectable } from 'tsyringe';
import { Tag } from '../../entities/Tag';
import { TagsRepository } from '../../repositories/implementations/TagsRepository';
import { ITagRepository } from '../../repositories/ITagRepository';

interface IRequest {
	tag: string;
	uuid_ref_product: string;
}

@injectable()
class TagUseCase {
	constructor(
		@inject(TagsRepository)
		private tagsRepository: ITagRepository
	) {}

	async executeCreate(tags: IRequest[]): Promise<void> {
		await Promise.all(
			tags.map(async (tag) => {
				await this.tagsRepository.create({ tag: tag.tag, uuid_ref_product: tag.uuid_ref_product });
			})
		);
	}

	async executeDelete(uuid_ref_product: string, tag: string) {
		await this.tagsRepository.delete(uuid_ref_product, tag);
	}

	async executeListAll(): Promise<Tag[]> {
		const allTags = await this.tagsRepository.listAllTags();

		return allTags;
	}

	async executeListByRef(uuid_ref_product: string): Promise<Tag[]> {
		const tagsByref = await this.tagsRepository.listTagsByRef(uuid_ref_product);
		return tagsByref;
	}
}

export { TagUseCase };

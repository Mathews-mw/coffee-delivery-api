import { Repository, UpdateResult, Equal } from 'typeorm';
import AppDataSource from '../../../database/data-source';
import { Tag } from '../../entities/Tag';
import { ICreateTagDTO, ITagRepository, IUpdateCreateTagDTO } from '../ITagRepository';

class TagsRepository implements ITagRepository {
	private repository: Repository<Tag>;

	constructor() {
		this.repository = AppDataSource.getRepository(Tag);
	}

	async create(data: ICreateTagDTO): Promise<Tag> {
		const { tag, uuid_ref_product } = data;

		const createNewTag = this.repository.create({
			tag,
			uuid_ref_product,
		});

		await this.repository.save(createNewTag);

		return createNewTag;
	}

	async update(data: IUpdateCreateTagDTO): Promise<UpdateResult> {
		const { tag, uuid_ref_product } = data;

		const updateTag = await this.repository
			.createQueryBuilder()
			.update(Tag)
			.set({
				tag: tag,
				uuid_ref_product: uuid_ref_product,
			})
			.where('uuid_ref_product = :uuid_ref_product', { uuid_ref_product: uuid_ref_product })
			.execute();

		return updateTag;
	}

	async delete(uuid_ref_product: string, tag: string): Promise<void> {
		await this.repository.createQueryBuilder().delete().from(Tag).where('uuid_ref_product = :uuid_ref_product', { uuid_ref_product: uuid_ref_product }).andWhere('tag = :tag', { tag: tag }).execute();
	}

	async listAllTags(): Promise<Tag[]> {
		const tags = await this.repository.find();
		return tags;
	}

	async listTagsByRef(uuid_ref_product: string): Promise<Tag[]> {
		const tagsByRef = await this.repository.findBy({
			uuid_ref_product: Equal(uuid_ref_product),
		});

		return tagsByRef;
	}
}

export { TagsRepository };

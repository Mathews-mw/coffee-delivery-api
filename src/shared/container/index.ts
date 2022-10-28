import { container } from 'tsyringe';
import { ITagRepository } from '../../modules/repositories/ITagRepository';
import { IUserRepository } from '../../modules/repositories/IUserRepository';
import { IProductRepository } from '../../modules/repositories/IProductRepository';
import { TagsRepository } from '../../modules/repositories/implementations/TagsRepository';
import { UserRepository } from '../../modules/repositories/implementations/UsersRepository';
import { ProductsRepository } from '../../modules/repositories/implementations/ProductsRepository';

container.registerSingleton<IUserRepository>('UserRepository', UserRepository);

container.registerSingleton<IProductRepository>('ProductRepository', ProductsRepository);

container.registerSingleton<ITagRepository>('TagRepository', TagsRepository);

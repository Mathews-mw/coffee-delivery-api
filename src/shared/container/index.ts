import { container } from 'tsyringe';

import { ITagRepository } from '../../modules/repositories/ITagRepository';
import { IUserRepository } from '../../modules/repositories/IUserRepository';
import { IOrderRepository } from '../../modules/repositories/IOrderRepository';
import { IProductRepository } from '../../modules/repositories/IProductRepository';
import { ICheckoutRepository } from '../../modules/repositories/ICheckoutRepository';

import { TagsRepository } from '../../modules/repositories/implementations/TagsRepository';
import { UserRepository } from '../../modules/repositories/implementations/UsersRepository';
import { OrdersRepository } from '../../modules/repositories/implementations/OrdersRepository';
import { ProductsRepository } from '../../modules/repositories/implementations/ProductsRepository';
import { CheckoutsRepository } from '../../modules/repositories/implementations/CheckoutsRepository';

container.registerSingleton<IUserRepository>('UserRepository', UserRepository);

container.registerSingleton<IProductRepository>('ProductRepository', ProductsRepository);

container.registerSingleton<ITagRepository>('TagRepository', TagsRepository);

container.registerSingleton<IOrderRepository>('OrdersRepository', OrdersRepository);

container.registerSingleton<ICheckoutRepository>('CheckoutsRepository', CheckoutsRepository);

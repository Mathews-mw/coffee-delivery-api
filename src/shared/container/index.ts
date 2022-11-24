import { container } from 'tsyringe';

import { IDateProvider } from '../providers/IDateProvider';
import { IMailProvider } from '../providers/IMailProvider';
import { ITagRepository } from '../../modules/repositories/ITagRepository';
import { IUserRepository } from '../../modules/repositories/IUserRepository';
import { IOrderRepository } from '../../modules/repositories/IOrderRepository';
import { IProductRepository } from '../../modules/repositories/IProductRepository';
import { ICheckoutRepository } from '../../modules/repositories/ICheckoutRepository';
import { IUsersTokensRepository } from '../../modules/repositories/IUsersTokensRepository';

import { DateProvider } from '../providers/implementations/DateProvider';
import { MailProvider } from '../providers/implementations/MailProvider';
import { TagsRepository } from '../../modules/repositories/implementations/TagsRepository';
import { UserRepository } from '../../modules/repositories/implementations/UsersRepository';
import { OrdersRepository } from '../../modules/repositories/implementations/OrdersRepository';
import { ProductsRepository } from '../../modules/repositories/implementations/ProductsRepository';
import { CheckoutsRepository } from '../../modules/repositories/implementations/CheckoutsRepository';
import { UsersTokensRepository } from '../../modules/repositories/implementations/UsersTokensRepository';

container.registerSingleton<IDateProvider>('IDateProvider', DateProvider);
container.registerSingleton<ITagRepository>('TagRepository', TagsRepository);
container.registerInstance<IMailProvider>('MailProvider', new MailProvider());
container.registerSingleton<IUserRepository>('UserRepository', UserRepository);
container.registerSingleton<IOrderRepository>('OrdersRepository', OrdersRepository);
container.registerSingleton<IProductRepository>('ProductRepository', ProductsRepository);
container.registerSingleton<ICheckoutRepository>('CheckoutsRepository', CheckoutsRepository);
container.registerSingleton<IUsersTokensRepository>('UsersTokensRepository', UsersTokensRepository);

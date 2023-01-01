import { container } from 'tsyringe';

import { IDateProvider } from '../providers/IDateProvider';
import { IMailProvider } from '../providers/IMailProvider';
import { IStorageProvider } from '../providers/IStorageProvider';
import { ITagRepository } from '../../modules/repositories/ITagRepository';
import { IUserRepository } from '../../modules/repositories/IUserRepository';
import { IOrderRepository } from '../../modules/repositories/IOrderRepository';
import { IProductRepository } from '../../modules/repositories/IProductRepository';
import { ICheckoutRepository } from '../../modules/repositories/ICheckoutRepository';
import { IPermissionRepository } from '../../modules/repositories/IPermissionRepository';
import { IUsersTokensRepository } from '../../modules/repositories/IUsersTokensRepository';
import { IUserPermissionsRepository } from '../../modules/repositories/IUserPermissionsRepository';

import { DateProvider } from '../providers/implementations/DateProvider';
import { MailProvider } from '../providers/implementations/EtherealMailProvider';
import { SESMailProvider } from '../providers/implementations/SESMailProvider';
import { S3StorageProvider } from '../providers/implementations/S3StorageProvider';
import { LocalStorageProvider } from '../providers/implementations/LocalStorageProvider';
import { TagsRepository } from '../../modules/repositories/implementations/TagsRepository';
import { UserRepository } from '../../modules/repositories/implementations/UsersRepository';
import { OrdersRepository } from '../../modules/repositories/implementations/OrdersRepository';
import { ProductsRepository } from '../../modules/repositories/implementations/ProductsRepository';
import { CheckoutsRepository } from '../../modules/repositories/implementations/CheckoutsRepository';
import { UsersTokensRepository } from '../../modules/repositories/implementations/UsersTokensRepository';
import { PermissionsRepository } from '../../modules/repositories/implementations/PermissionsRepository';
import { UserPermissionsRepository } from '../../modules/repositories/implementations/UserPermissionsRepository';

const diskStorage = {
	s3: S3StorageProvider,
	local: LocalStorageProvider,
};

const mailProvider = {
	ses: container.resolve(SESMailProvider),
	ethereal: container.resolve(MailProvider),
};

container.registerSingleton<IDateProvider>('IDateProvider', DateProvider);
container.registerSingleton<ITagRepository>('TagRepository', TagsRepository);
container.registerSingleton<IUserRepository>('UserRepository', UserRepository);
container.registerSingleton<IOrderRepository>('OrdersRepository', OrdersRepository);
container.registerSingleton<IProductRepository>('ProductRepository', ProductsRepository);
container.registerSingleton<ICheckoutRepository>('CheckoutsRepository', CheckoutsRepository);
container.registerSingleton<IStorageProvider>('StorageProvider', diskStorage[process.env.disk]);
container.registerSingleton<IPermissionRepository>('PermissionsRepository', PermissionsRepository);
container.registerInstance<IMailProvider>('MailProvider', mailProvider[process.env.MAIL_PROVIDER]);
container.registerSingleton<IUsersTokensRepository>('UsersTokensRepository', UsersTokensRepository);
container.registerSingleton<IUserPermissionsRepository>('UserPermissionsRepository', UserPermissionsRepository);

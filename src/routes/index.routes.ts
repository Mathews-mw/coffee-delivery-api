import { Router } from 'express';

import { authRoutes } from './auth.routes';
import { usersRoutes } from './users.routes';
import { ordersRoutes } from './orders.routes';
import { passwordRoutes } from './password.routes';
import { productsRoutes } from './products.routes';
import { permissionsRoutes } from './permissions.routes';
import { usersPermissionsRoutes } from './usersPermissions.routes';

const router = Router();

router.use('/users', usersRoutes);
router.use('/orders', ordersRoutes);
router.use('/authenticate', authRoutes);
router.use('/password', passwordRoutes);
router.use('/products', productsRoutes);
router.use('/permissions', permissionsRoutes);
router.use('/users-permissions', usersPermissionsRoutes);

export { router };

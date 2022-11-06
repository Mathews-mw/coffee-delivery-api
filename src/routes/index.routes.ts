import { Router } from 'express';
import { authRoutes } from './auth.routes';
import { usersRoutes } from './users.routes';
import { ordersRoutes } from './orders.routes';
import { productsRoutes } from './products.routes';

const router = Router();

router.use('/authenticate', authRoutes);
router.use('/users', usersRoutes);
router.use('/products', productsRoutes);
router.use('/orders', ordersRoutes);

export { router };

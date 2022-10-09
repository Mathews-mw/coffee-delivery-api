import { Router } from 'express';
import { authRoutes } from './auth.routes';
import { usersRoutes } from './users.routes';

const router = Router();

router.use('/authenticate', authRoutes);
router.use('/users', usersRoutes);

export { router };

import { Router } from 'express';
import { AuthUserController } from '../modules/core/controllers/AuthUserController';

const authRoutes = Router();

const authUserController = new AuthUserController();

authRoutes.post('/login', authUserController.handle);

export { authRoutes };

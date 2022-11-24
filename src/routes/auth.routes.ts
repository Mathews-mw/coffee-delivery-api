import { Router } from 'express';

import { AuthUserController } from '../modules/core/controllers/AuthUserController';
import { RefreshTokenController } from '../modules/core/controllers/RefreshTokenController';

const authRoutes = Router();

const authUserController = new AuthUserController();
const refreshTokenController = new RefreshTokenController();

authRoutes.post('/login', authUserController.handle);
authRoutes.post('/refresh-token', refreshTokenController.handleCreate);

export { authRoutes };

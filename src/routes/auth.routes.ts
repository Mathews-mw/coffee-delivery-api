import { Router } from 'express';
import { authUserController } from '../modules/accounts/useCases/authenticateUser';

const authRoutes = Router();

authRoutes.post('/login', (request, response) => {
	authUserController.handle(request, response);
});

export { authRoutes };

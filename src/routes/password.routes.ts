import { Router } from 'express';

import { ResetPasswordUserController } from '../modules/core/controllers/ResetPasswordController';
import { ForgottenUserPasswordController } from '../modules/core/controllers/ForgottenUserPasswordController';

const passwordRoutes = Router();

const resetPasswordUserController = new ResetPasswordUserController();
const forgottenUserPasswordController = new ForgottenUserPasswordController();

passwordRoutes.post('/forgot', forgottenUserPasswordController.handle);
passwordRoutes.post('/reset', resetPasswordUserController.handle);

export { passwordRoutes };

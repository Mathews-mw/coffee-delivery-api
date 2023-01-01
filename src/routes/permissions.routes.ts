import { Router } from 'express';
import { ensureAuthenticate } from '../middleware/ensureAuthenticate';
import { PermissionsController } from '../modules/core/controllers/PermissionsController';

const permissionsRoutes = Router();

const permissionsController = new PermissionsController();

permissionsRoutes.get('/', ensureAuthenticate, permissionsController.handleIndex);
permissionsRoutes.get('/:id', ensureAuthenticate, permissionsController.handleIndexById);

export { permissionsRoutes };

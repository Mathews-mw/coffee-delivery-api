import { Router } from 'express';
import { ensureAdmin } from '../middleware/ensureAdmin';
import { ensureAuthenticate } from '../middleware/ensureAuthenticate';
import { UsersPermissionsController } from '../modules/core/controllers/UsersPermissionsController';

const usersPermissionsRoutes = Router();

const usersPermissionsController = new UsersPermissionsController();

usersPermissionsRoutes.get('/', [ensureAuthenticate, ensureAdmin], usersPermissionsController.handleIndex);
usersPermissionsRoutes.get('/:userID', [ensureAuthenticate, ensureAdmin], usersPermissionsController.handleIndexUserId);
usersPermissionsRoutes.post('/', [ensureAuthenticate, ensureAdmin], usersPermissionsController.handleCreate);
usersPermissionsRoutes.put('/', [ensureAuthenticate, ensureAdmin], usersPermissionsController.handleUpdate);
usersPermissionsRoutes.delete('/', [ensureAuthenticate, ensureAdmin], usersPermissionsController.handleDelete);

export { usersPermissionsRoutes };

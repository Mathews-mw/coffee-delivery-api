import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '../config/upload';
import { ensureAuthenticate } from '../middleware/ensureAuthenticate';
import { UserController } from '../modules/core/controllers/UserController';

const usersRoutes = Router();

const uploadAvatar = multer(uploadConfig.upload('./tmp/avatar'));

const userController = new UserController();

usersRoutes.get('/', ensureAuthenticate, userController.handleListAllUsers);
usersRoutes.get('/:cpf', ensureAuthenticate, userController.handleFindByCPF);
usersRoutes.post('/', userController.handleCreate);
usersRoutes.put('/:id', ensureAuthenticate, userController.handleUpdateUser);
usersRoutes.patch('/:id', ensureAuthenticate, uploadAvatar.single('avatar_file'), userController.handleUpdateUserAvatar);

export { usersRoutes };

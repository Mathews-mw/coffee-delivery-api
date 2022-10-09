import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '../config/upload';
import { ensureAuthenticate } from '../middleware/ensureAuthenticate';
import { userController } from '../modules/accounts/useCases/User';

const usersRoutes = Router();

const uploadAvatar = multer(uploadConfig.upload('./tmp/avatar'));

usersRoutes.get('/', ensureAuthenticate, (request, response) => {
	userController.handleListAllUsers(request, response);
});

/* usersRoutes.get('/', ensureAuthenticate, (request, response) => {
	userController.handleFindByCPF(request, response);
}); */

usersRoutes.post('/', (request, response) => {
	userController.handleCreate(request, response);
});

usersRoutes.put('/:id', (request, response) => {
	userController.handleUpdateUser(request, response);
});

usersRoutes.patch(
	'/:id',
	uploadAvatar.single('avatar'),
	ensureAuthenticate,
	(request, response) => {
		userController.handleUpdateUserAvatar(request, response);
	}
);

export { usersRoutes };

import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '../config/upload';
import { ensureAuthenticate } from '../middleware/ensureAuthenticate';
import { TagController } from '../modules/core/controllers/TagController';
import { ProductController } from '../modules/core/controllers/ProductController';
import { ensureAdmin } from '../middleware/ensureAdmin';

const productsRoutes = Router();

const uploadProductImage = multer(uploadConfig);

const tagController = new TagController();
const productsController = new ProductController();

productsRoutes.get('/', productsController.handleListAllProducts);
productsRoutes.get('/tags', tagController.handleListAllTags);
productsRoutes.get('/tags/:ref', tagController.handleListByRef);
productsRoutes.get('/paginate', productsController.handleGetManyProducts);
productsRoutes.get('/:ID', productsController.handleListByID);
productsRoutes.post('/', [ensureAuthenticate, ensureAdmin], uploadProductImage.single('image_name'), productsController.handleCreate);
productsRoutes.post('/tags', [ensureAuthenticate, ensureAdmin], tagController.handleCreate);
productsRoutes.put('/:ID', [ensureAuthenticate, ensureAdmin], productsController.handleUpdate);
productsRoutes.patch('/image/:ID', [ensureAuthenticate, ensureAdmin], uploadProductImage.single('image_name'), productsController.handleUpdateProductImage);
productsRoutes.delete('/:ID', [ensureAuthenticate, ensureAdmin], productsController.handleDelete);

export { productsRoutes };

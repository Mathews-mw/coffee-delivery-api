import { Router } from 'express';
import paginate from 'express-paginate';
import multer from 'multer';
import uploadConfig from '../config/upload';
import { ensureAuthenticate } from '../middleware/ensureAuthenticate';
import { ProductController } from '../modules/core/controllers/ProductController';
import { TagController } from '../modules/core/controllers/TagController';

const productsRoutes = Router();

const uploadProductImage = multer(uploadConfig.upload('./tmp/productsImages'));

const productsController = new ProductController();
const tagController = new TagController();

productsRoutes.get('/', productsController.handleListAllProducts);
productsRoutes.get('/many', productsController.handleGetManyProducts);
productsRoutes.post('/', ensureAuthenticate, uploadProductImage.single('image_name'), productsController.handleCreate);
productsRoutes.put('/:ID', ensureAuthenticate, uploadProductImage.single('image_name'), productsController.handleUpdate);
productsRoutes.delete('/:ID', ensureAuthenticate, productsController.handleDelete);

productsRoutes.get('/tags', tagController.handleListAllTags);
productsRoutes.get('/tags/:ref', tagController.handleListByRef);
productsRoutes.post('/tags', ensureAuthenticate, tagController.handleCreate);

export { productsRoutes };

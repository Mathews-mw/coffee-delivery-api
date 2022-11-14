import { Router } from 'express';

import { ensureAuthenticate } from '../middleware/ensureAuthenticate';
import { OrdersController } from '../modules/core/controllers/OrdersController';
import { CheckoutController } from '../modules/core/controllers/CheckoutController';

const ordersRoutes = Router();

const ordersController = new OrdersController();
const checkoutController = new CheckoutController();

ordersRoutes.get('/:user_id', ensureAuthenticate, ordersController.handleIndexByUserId);
ordersRoutes.post('/', ensureAuthenticate, ordersController.handleCreate);
ordersRoutes.post('/checkout', ensureAuthenticate, checkoutController.handleCreate);

export { ordersRoutes };

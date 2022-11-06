import { Router } from 'express';
import { ensureAuthenticate } from '../middleware/ensureAuthenticate';
import { CheckoutController } from '../modules/core/controllers/CheckoutController';
import { OrdersController } from '../modules/core/controllers/OrdersController';

const ordersRoutes = Router();

const ordersController = new OrdersController();
const checkoutController = new CheckoutController();

ordersRoutes.post('/', ensureAuthenticate, ordersController.handleCreate);

ordersRoutes.post('/checkout', ensureAuthenticate, checkoutController.handleCreate);

export { ordersRoutes };

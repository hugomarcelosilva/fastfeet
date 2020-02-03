import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import DeliveryCancelController from './app/controllers/DeliveryCancelController';
import DeliveryController from './app/controllers/DeliveryController';
import DeliveryManController from './app/controllers/DeliveryManController';
import DeliveryProblemController from './app/controllers/DeliveryProblemController';
import DeliveryStatusController from './app/controllers/DeliveryStatusController';
import FileController from './app/controllers/FileController';
import RecipientController from './app/controllers/RecipientController';
import SessionController from './app/controllers/SessionController';
import UserController from './app/controllers/UserController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.get('/deliveryman/:id/deliveries', DeliveryStatusController.index);
routes.put(
  '/deliveryman/:id/deliveries',
  upload.single('file'),
  DeliveryStatusController.update
);

routes.get('/delivery/:id/problems', DeliveryProblemController.index);
routes.post('/delivery/:id/problems', DeliveryProblemController.store);

routes.post('/problem/:id/cancel-delivery', DeliveryCancelController.store);

routes.use(authMiddleware);

routes.get('/deliverymen', DeliveryManController.index);
routes.post('/deliverymen', DeliveryManController.store);
routes.put('/deliverymen/:id', DeliveryManController.update);
routes.delete('/deliverymen/:id', DeliveryManController.delete);

routes.get('/deliveries', DeliveryController.index);
routes.post('/deliveries', DeliveryController.store);
routes.put('/deliveries/:id', DeliveryController.update);
routes.delete('/deliveries/:id', DeliveryController.delete);

routes.get('/recipients', RecipientController.index);
routes.post('/recipients', RecipientController.store);
routes.put('/recipients/:id', RecipientController.update);
routes.delete('/recipients/:id', RecipientController.delete);

routes.post('/files', upload.single('file'), FileController.store);

export default routes;

import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import DeliveryManController from './app/controllers/DeliveryManController';
import FileController from './app/controllers/FileController';
import RecipientController from './app/controllers/RecipientController';
import SessionController from './app/controllers/SessionController';
import UserController from './app/controllers/UserController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.get('/recipients', RecipientController.index);

routes.use(authMiddleware);

routes.get('/deliveryman', DeliveryManController.index);
routes.post('/deliveryman', DeliveryManController.store);
routes.put('/deliveryman/:id', DeliveryManController.update);
routes.delete('/deliveryman/:id', DeliveryManController.delete);

routes.post('/recipients', RecipientController.store);
routes.put('/recipients/:id', RecipientController.update);
routes.delete('/recipients/:id', RecipientController.delete);

routes.post('/files', upload.single('file'), FileController.store);

export default routes;

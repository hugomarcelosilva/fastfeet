import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import DeliveryCancelController from './app/controllers/DeliveryCancelController';
import DeliveryCheckInController from './app/controllers/DeliveryCheckInController';
import DeliveryCheckOutController from './app/controllers/DeliveryCheckOutController';
import DeliveryClosedController from './app/controllers/DeliveryClosedController';
import DeliveryController from './app/controllers/DeliveryController';
import DeliveryManController from './app/controllers/DeliveryManController';
import DeliveryProblemController from './app/controllers/DeliveryProblemController';
import DeliveryOpenedController from './app/controllers/DeliveryOpenedController';
import FileController from './app/controllers/FileController';
import ProblemController from './app/controllers/ProblemController';
import RecipientController from './app/controllers/RecipientController';
import SessionController from './app/controllers/SessionController';
import UserController from './app/controllers/UserController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/users', UserController.store);

// Fazer login na aplicação
routes.post('/sessions', SessionController.store);

// Encomendas
// Retirada da encomenda
routes.put('/deliveries/checkin/:id', DeliveryCheckInController.update);

// Entrega da encomenda
routes.put(
  '/deliveries/checkout/:id',
  upload.single('signature'),
  DeliveryCheckOutController.update
);

// Exibir todos os pacotes disponiveis para retirada
routes.get(
  '/deliveryman/:id/deliveries/available',
  DeliveryOpenedController.index
);

// Exibir todos os pacotes do entregador que foram entregues
routes.get('/deliveryman/:id/deliveries', DeliveryClosedController.index);

// Verificar todas as encomendas que tem algum problema
routes.get('/problems', ProblemController.index);

// Verificar problemas de uma unica encomenda
routes.get('/delivery/:id/problems', DeliveryProblemController.index);
routes.post('/problem/:id/cancel-delivery', DeliveryCancelController.store);

// Criar um problema para encomenda
routes.post('/delivery/:id/problems', DeliveryProblemController.store);

routes.use(authMiddleware);

routes.post('/files', upload.single('file'), FileController.store);

// Exibir todos os entregadores
routes.get('/deliverymen', DeliveryManController.index);

// Criar um novo entregador
routes.post('/deliverymen', DeliveryManController.store);

// Editar um entregador
routes.put('/deliverymen/:id', DeliveryManController.update);

// Deletar um entregador
routes.delete('/deliverymen/:id', DeliveryManController.delete);

// Exibir todas as entregas
routes.get('/deliveries', DeliveryController.index);

// Criar uma nova entrega
routes.post('/deliveries', DeliveryController.store);

// Editar alguma entrega
routes.put('/deliveries/:id', DeliveryController.update);

// Deletar alguma entrega
routes.delete('/deliveries/:id', DeliveryController.delete);

// Exibir todos os destinatarios
routes.get('/recipients', RecipientController.index);

// Criar um destinatario
routes.post('/recipients', RecipientController.store);

// Editar um destinatario
routes.put('/recipients/:id', RecipientController.update);

// Exibir um destinatario
routes.delete('/recipients/:id', RecipientController.delete);

export default routes;

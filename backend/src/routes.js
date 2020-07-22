import { Router } from 'express';
import multer from 'multer';

import DeliveryCancelController from './app/controllers/DeliveryCancelController';
import DeliveryCheckInController from './app/controllers/DeliveryCheckInController';
import DeliveryCheckOutController from './app/controllers/DeliveryCheckOutController';
import DeliveryController from './app/controllers/DeliveryController';
import DeliveryManController from './app/controllers/DeliveryManController';
import DeliveryOpenedController from './app/controllers/DeliveryOpenedController';
import DeliveryProblemController from './app/controllers/DeliveryProblemController';
import FileController from './app/controllers/FileController';
import ProblemController from './app/controllers/ProblemController';
import RecipientController from './app/controllers/RecipientController';
import SessionController from './app/controllers/SessionController';
import UserController from './app/controllers/UserController';
import authMiddleware from './app/middlewares/auth';
import multerConfig from './config/multer';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/users', UserController.store);

// Fazer login na aplicação
routes.post('/sessions', SessionController.store);

// Exibir todos os pacotes disponiveis para retirada
routes.get('/deliveryman/:id/deliveries', DeliveryOpenedController.index);

// Exibir todos os entregadores
routes.get('/deliverymen', DeliveryManController.index);

// Encomendas
// Retirada da encomenda
routes.put(
  '/deliveryman/:deliverymanId/deliveries/:deliveryId/checkin',
  DeliveryCheckInController.update
);

// Entrega da encomenda
routes.put(
  '/deliveryman/:deliverymanId/deliveries/:deliveryId/checkout',
  DeliveryCheckOutController.update
);

// Verificar todas as encomendas que tem algum problema
routes.get('/problems', ProblemController.index);

// Verificar problemas de uma unica encomenda
routes.get('/delivery/:id/problems', DeliveryProblemController.index);

// Criar um problema para encomenda
routes.post('/delivery/:id/problems', DeliveryProblemController.store);

// Cancelar a encomenda
routes.post('/problem/:id/cancel-delivery', DeliveryCancelController.store);

routes.post('/files', upload.single('file'), FileController.store);

routes.use(authMiddleware);

// Exibir todos os usuários
routes.get('/users', UserController.index);

// Editar um usuário
routes.put('/users/:id', UserController.update);

// Deletar um usuário
routes.delete('/users/:id', UserController.delete);

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

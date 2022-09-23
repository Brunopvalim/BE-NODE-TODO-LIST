import { Router } from 'express';

import * as TodoController from '../controllers/todoController';
import * as LoginController from '../controllers/loginController';

const router = Router();

router.get('/todo', TodoController.all);
router.get('/todo/:find', TodoController.find);
router.post('/register', LoginController.register);
router.post('/login', LoginController.login);
router.post('/todo', TodoController.add);
router.put('/todo/:id', TodoController.update);
router.delete('/todo/:id', TodoController.remove);


export default router;
import { Router } from 'express';

import * as TodoController from '../controllers/todoController';
import * as LoginController from '../controllers/loginController';

const router = Router();

// GET Routes
router.get('/todo', TodoController.all);
router.get('/todo/:find', TodoController.find);

// POST Routes
router.post('/register', LoginController.register);
router.post('/login', LoginController.login);
router.post('/todo', TodoController.add);

// UPDATE Routes
router.put('/todo/:id', TodoController.update);

// DELETE Routes
router.delete('/todo/:id', TodoController.remove);


export default router;
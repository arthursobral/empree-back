import { UsuarioController } from '../modules/usuario/usuario.controller';
import { Router } from 'express';
import { body } from 'express-validator';

const routes = Router();

const usuarioController = new UsuarioController();

routes.post(
  '/usuario/register',
  [
    body('nome').isString().withMessage('Nome inválida'),
    body('email').isEmail().withMessage('Email inválido'),
    body('senha').isString().withMessage('Senha inválida'),
  ],
  usuarioController.signUp
);

routes.post(
  '/usuario/login',
  [
    body('email').isEmail().withMessage('Email inválido'),
    body('senha').isString().withMessage('Senha inválida'),
  ],
  usuarioController.signIn
);

export { routes as UsuarioRoutes };

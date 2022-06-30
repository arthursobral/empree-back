import { Router } from 'express';
import { ensureAuthenticate } from '../middleware/ensureAuthenticate.middleware';
import { param, body } from 'express-validator';
import { HorarioController } from '../modules/horario/horario.controller';

const routes = Router();

const horarioController = new HorarioController();

routes.post(
  '/horario',
  ensureAuthenticate,
  [
    body('nome').isString().isLength({min: 3}).withMessage('Nome Invalido'),
    body('agendamento').isNumeric({no_symbols: true}).withMessage('Agendamento inválido'),
    body('desc').optional().isString().withMessage('Descricao Invalida'),
    body('duracao').isNumeric({no_symbols: true}).withMessage('Duração inválido'),
  ],
  horarioController.post
);

routes.get(
  '/horario',
  ensureAuthenticate,
  horarioController.getAll
);

routes.get(
  '/horario/:id_horario',
  ensureAuthenticate,
  [
    param('id_horario').isString().withMessage('Id inválido'),
  ],
  horarioController.getById
);

routes.put(
  '/horario/:id_horario',
  ensureAuthenticate,
  [
    param('id_horario').isString().withMessage('Id inválido'),
  ],
  [
    body('nome').optional().isLength({min: 3}),
    body('agendamento').optional().isNumeric({no_symbols: true}).withMessage('Agendamento inválido'),
    body('desc').optional().isLength({min: 3}),
    body('duracao').optional().isNumeric({no_symbols: true}).withMessage('Duração inválido'),
  ],
  horarioController.put
);

routes.delete(
  '/horario/:id_horario',
  ensureAuthenticate,
  [
    param('id_horario').isString().withMessage('Id inválido'),
  ],
  horarioController.delete
);

export { routes as HorarioRoutes };

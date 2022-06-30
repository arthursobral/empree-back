import 'express-async-errors';
import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import { logRequests } from './middleware/log.middleware';
import { UsuarioRoutes } from './router/usuario.router';
import { HorarioRoutes } from './router/horario.router';

const app = express();

app.use(cors());

app.use(logRequests);

app.use(express.json());

app.use(UsuarioRoutes);
app.use(HorarioRoutes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof Error) {
      return res.status(400).json({
        message: err.message,
      });
    }
  
    return res.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
});
  
app.listen(3333, () => {
    console.log('server is running');
});
  
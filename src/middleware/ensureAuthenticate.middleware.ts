import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

interface PayloadDTO {
  sub: string;
}

// middleware para validar o token de autenticação
export async function ensureAuthenticate(
  request: Request,
  response: Response,
  next: NextFunction
) {
  // pega o token do header de autenticação
  const authHeader = request.headers.authorization;

  // pega o token do header de autenticação
  if (!authHeader) {
    return response.status(401).json({ message: 'Token not provided' });
  }

  const [, token] = authHeader.split(' ');

  try {
    // valida o token
    const { sub } = verify(
      token,
      'f84d7297c45d35d2ff82934361bdbe40'
    ) as PayloadDTO;
    
    // adiciona no request o id do usuario para reliazar a requisição
    request.id_usuario = sub.toString();

    return next();
  } catch (error) {
    return response.status(401).json({ message: 'Invalid Token!' });
  }
}

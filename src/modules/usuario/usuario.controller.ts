import { UsuarioService } from './usuario.service';
import { Request, Response } from 'express';
import { validationResult } from 'express-validator';

export class UsuarioController {
  async signUp(request: Request, response: Response) {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array() });
    }

    const { nome, email, senha } = request.body;

    const usuarioService = new UsuarioService();

    const result = await usuarioService.signUp({
      nome,
      email,
      senha,
    });



    return response.json(result.id);
  }

  async signIn(request: Request, response: Response) {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array() });
    }

    const { email, senha } = request.body;

    const usuarioService = new UsuarioService();
    console.log("oi")
    const result = await usuarioService.signIn({
      email,
      senha,
    });

    return response.json(result);
  }
}

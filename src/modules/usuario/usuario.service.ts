import { compare, hash } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { prisma } from '../../database/prismaClient';

interface CreateUsuarioDTO {
  nome: string;
  email: string;
  senha: string;
}

interface AuthenticateUsuarioDTO {
  email: string;
  senha: string;
}

export class UsuarioService {
  async signUp({ nome, email, senha }: CreateUsuarioDTO) {
    //valida se o usuario já existe
    const usuarioDB = await prisma.usuario.findFirst({
      where: {
        email,
      },
    });

    if (usuarioDB) {
      throw new Error('Usuário já existe');
    }

    // codifica a senha para ser salva no banco
    const hashPassword = await hash(senha, 10);

    const usuario = await prisma.usuario.create({
      data: {
        nome,
        email,
        senha: hashPassword,
      },
    });

    return usuario;
  }

  async signIn({ email, senha }: AuthenticateUsuarioDTO) {
    const usuario = await prisma.usuario.findFirst({
      where: {
        email,
      },
    });

    if (!usuario) {
      throw new Error('Usuário ou senha incorretos!');
    }

    const nome = usuario.nome;

    // compara a senha criptografada com a senha enviada
    const passwordMatch = await compare(senha, usuario.senha);

    if (!passwordMatch) {
      throw new Error('Usuário ou senha incorretos!');
    }

    // caso seja válida a senha é gerado o token com o payload do id_usuario
    const token = sign(
      { id_usuario: usuario.id },
      'f84d7297c45d35d2ff82934361bdbe40',
      {
        subject: usuario.id.toString(),
      }
    );

    return {
      token,
      nome
    };
  }
}

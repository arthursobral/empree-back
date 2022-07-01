import { prisma } from '../../database/prismaClient';

interface CreateHorarioDTO {
    nome: string;
    id_cliente: string;
    agendamento: number;
    desc: string;
    duracao: number;
}

interface UpdateHorarioDTO {
    nome?: string;
    agendamento?: number;
    desc?: string;
    duracao?: number;
}

export class HorarioService{
    async create({
        nome,
        id_cliente,
        agendamento,
        desc,
        duracao
    }: CreateHorarioDTO){
        const usuarioDB = await prisma.usuario.findFirst({
            where: {
                id: id_cliente
            }
        })

        if (!usuarioDB) {
            throw new Error('Cliente não existe');
        }
        
        const horarioDB = await prisma.horario.create({
            data: {
                nome,
                id_usuario: id_cliente,
                agendamento,
                desc,
                duracao
            }
        })
        
        return horarioDB;
    }

    async selectAll(id_usuario: string){
        const horarios = await prisma.horario.findMany({
            where: {
                usuario:{
                    id: id_usuario
                }
            },
        })

        return horarios;
    }

    async selectById(id_horario: string){
        const horario = await prisma.horario.findFirst({
            where: {
                id: id_horario,
            }
        })

        return horario;
    }

    async update(id_horario: string,
        {nome, agendamento, desc, duracao}: UpdateHorarioDTO
    ){
        const horario = await this.selectById(id_horario);

        if(!horario){
            throw new Error('Horario nao encontrado');
        }

        const newHorario = await prisma.horario.update({
            where: {
                id: id_horario
            },
            data:{
                nome,
                agendamento,
                desc,
                duracao
            }
        })

        return newHorario;
    }

    async deleteById(id_horario: string){
        const horario = await this.selectById(id_horario);

        if(!horario){
            throw new Error('Horario nao encontrado');
        }

        return await prisma.horario.delete({
            where: {
                id: id_horario
            }
        })
    }
}
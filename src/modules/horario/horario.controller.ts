import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { HorarioService } from './horario.service';

export class HorarioController{
    async post(req: Request, res: Response){
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        let {nome, agendamento, desc, duracao } = req.body;
        
        const horarioService = new HorarioService();
        
        const result = await horarioService.create({
            nome,
            id_cliente: req.id_usuario.toString(),
            agendamento,
            desc,
            duracao
        })
        
        return res.json(result)
    }

    async getAll(req: Request, res: Response){
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const horarioService = new HorarioService();

        const result = await horarioService.selectAll(
           req.id_usuario.toString(),
        );

        return res.json(result);
    }

    async getById(req: Request, res: Response){
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const horarioService = new HorarioService();

        const result = await horarioService.selectById(
           req.params.id_horario.toString(),
        );

        return res.json(result);
    }

    async put(req: Request, res: Response){
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        let {nome, agendamento, desc, duracao } = req.body;

        const horarioService = new HorarioService();

        const result = await horarioService.update(
            req.params.id_horario.toString(),
            {
                nome, 
                agendamento,
                desc,
                duracao
            }
        )

        return res.json(result);
    }

    async delete(req: Request, res: Response){
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const horarioService = new HorarioService();

        const result = await horarioService.deleteById(req.params.id_horario.toString());

        return res.json(result)
    }
}
import { Request, Response } from 'express';
import { Todo } from '../models/Todo';

export const register = async (req: Request, res: Response) => {
    if(req.body.email && req.body.password) {
        let { email, password } = req.body;

        let hasUser = await Todo.findOne({where: { email }});
        if(!hasUser) {
            let newUser = await Todo.create({ email, password });

            res.status(201);
            res.json({ id: newUser.id });
        } else {
            res.json({ error: 'E-mail já existe.' });
        }
    }

    res.json({ error: 'E-mail e/ou senha não enviados.' });
}

export const login = async (req: Request, res: Response) => {
    if(req.body.email && req.body.password) {
        let email: string = req.body.email;
        let password: string = req.body.password;

        let user = await Todo.findOne({ 
            where: { email, password }
        });

        if(user) {
            res.json({ status: true });
            return;
        }
    }

    res.json({ status: false });
}

export const list = async (req: Request, res: Response) => {
    let users = await Todo.findAll();
    let list: string[] = [];

    for(let i in users) {
        list.push( users[i].title );
    }

    res.json({ list });
}
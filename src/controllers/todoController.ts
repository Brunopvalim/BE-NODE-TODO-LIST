import { Request, Response } from 'express';
import { Todo } from '../models/Todo';


export const all = async (req: Request, res: Response) => {
    const list = await Todo.findAll();
    if (list) {
        res.json({ list })
    } else {
        res.json({ error: "No tasks yet." })
    }
}

export const find = async (req: Request, res: Response) => {
    let searchTerm: string = req.body.query;
    const list = await Todo.findAll({
        limit: 10,
        where: {
            title: '%' + searchTerm + '%'
        }
    });

    if (list) {
        res.json({ list })
    } else {
        res.json({ error: "No records found." })
    }
}

export const add = async (req: Request, res: Response) => {
    if (req.body.title) {
        let newTodo = await Todo.create({
            title: req.body.title,
            done: req.body.done ? true : false,
            owner: req.body.email
        });

        res.status(201).json({ item: newTodo });

    } else {
        res.json({ error: "title required" })
    }
}

export const update = async (req: Request, res: Response) => {
    const id: string = req.params.id;
    const email: string = req.body.email;
    let todo = await Todo.findByPk(id);

    if (todo) {
        if (todo.owner === email) {
            if (req.body.title) {
                todo.title = req.body.title;

                if (req.body.done) {
                    switch (req.body.done.toLowerCase()) {
                        case 'true':
                        case '1':
                            todo.done = true;
                            break;
                        case 'false':
                        case '0':
                            todo.done = false;
                            break;
                    }
                }

                await todo.save();
                res.json({ item: todo });

            } else {
                res.json({ error: "You are not the owner of the post" })
            }
        }
    }
}

export const remove = async (req: Request, res: Response) => {
    let id: string = req.params.id;

    let todo = await Todo.findByPk(id);
    if (todo) {
        if (todo.owner === req.body.email) {
            await todo.destroy();
        }
    } else {
        res.json({ error: "You are not the owner of the post" })
    }

}
import { Request, Response } from 'express';
import { User } from '../models/User';

// Register a user
export const register = async (req: Request, res: Response) => {
    if (req.body.email && req.body.password) {
        let { email, password } = req.body;

        let hasUser = await User.findOne({ where: { email } });
        if (!hasUser) {
            let newUser = await User.create({ email, password });

            res.status(201);
            res.json({ id: newUser.user_id });
        } else {
            res.json({ error: 'E-mail already exists.' });
        }
    }

    res.json({ error: 'Please enter your credentials.' });
}

// Login user
export const login = async (req: Request, res: Response) => {
    if (req.body.email && req.body.password) {
        let email: string = req.body.email;
        let password: string = req.body.password;

        let user = await User.findOne({
            where: { email, password }
        });

        if (user) {
            res.json({ status: true });
            return;
        }
    }

    res.json({ status: false });
}


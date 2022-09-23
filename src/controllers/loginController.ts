import { Request, Response } from 'express';
import { User } from '../models/User';

// Register User
export const register = async (req: Request, res: Response) => {
    // Verify if credential were provided
    if (req.body.email && req.body.password) {
        
        // Request GET params
        let { email, password } = req.body;

        // Check if User is already registered, otherwise create a new user
        let hasUser = await User.findOne({ where: { email } });
        if (!hasUser) {
            let newUser = await User.create({ email, password });

            res.status(201);
            res.json({ id: newUser.user_id });
        } else {
            res.json({ error: 'E-mail already exists.' });
        }
    }
    // Error handler
    res.json({ error: 'Please enter your credentials.' });
}

// User Login
export const login = async (req: Request, res: Response) => {
    // Verify if credential were provided
    if (req.body.email && req.body.password) {
        
        // Setting user information
        let email: string = req.body.email;
        let password: string = req.body.password;

        // Checks if the user exists in the database, otherwise return false
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


import type {Request, Response} from 'express';
import { registerUser } from '../services/auth/registerUser';

const registerUserController = async (req: Request, res: Response) => {
    const { email, password, companyName, role } = req.body;
    try {
        const user = await registerUser({ email, password, companyName, role });
        if (!user) {
            throw new Error('registerUser returned null.');
        }
        res.status(201).send('User registered successfully');
    } catch (error) {
        res.status(500).send(`Error registering user: ${error}`);
    }
};

export { registerUserController }
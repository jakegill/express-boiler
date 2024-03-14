import type { Request, Response } from 'express';
import { loginUser } from '../services/auth/loginUser';

const loginUserController = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
        const token = await loginUser({ email, password });
        res.status(200).send({
            message: "Login successful",
            token: token
        });
    } catch (error) {
        res.status(500).send(`Error logging in: ${error}`);
    }
};

export { loginUserController };
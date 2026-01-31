import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export interface AuthRequest extends Request {
    user?: any;
}

export const authenticateToken = (req: AuthRequest, res: Response, next: NextFunction) => {
    const token = req.cookies.token;

    if (!token) {
        // Fallback to checking Authorization header if we still want to support it
        const authHeader = req.headers['authorization'];
        const tokenHeader = authHeader && authHeader.split(' ')[1];
        if (tokenHeader) {
             jwt.verify(tokenHeader, process.env.JWT_SECRET || 'secret_key', (err: any, user: any) => {
                if (err) return res.sendStatus(403);
                req.user = user;
                next();
            });
            return;
        }
        return res.sendStatus(401);
    }

    jwt.verify(token, process.env.JWT_SECRET || 'secret_key', (err: any, user: any) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};

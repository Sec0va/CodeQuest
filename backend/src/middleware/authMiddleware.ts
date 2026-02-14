import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AppDataSource } from '../data-source';
import { User } from '../models/User';

export interface AuthRequest extends Request {
    user?: any;
}

export const authenticateToken = (req: AuthRequest, res: Response, next: NextFunction) => {
    const token = req.cookies.token;
    const authHeader = req.headers['authorization'];
    const tokenHeader = authHeader && authHeader.split(' ')[1];
    const rawToken = token || tokenHeader;

    if (!rawToken) {
        res.sendStatus(401);
        return;
    }

    let payload: any;
    try {
        payload = jwt.verify(rawToken, process.env.JWT_SECRET || 'secret_key');
    } catch (_error) {
        res.sendStatus(403);
        return;
    }

    const userId = typeof payload === 'object' && payload?.id ? String(payload.id) : '';
    if (!userId) {
        res.sendStatus(403);
        return;
    }

    AppDataSource.getRepository(User)
        .findOneBy({ id: userId })
        .then((user) => {
            if (!user) {
                res.status(401).json({ message: 'Unauthorized' });
                return;
            }
            if (user.isBanned) {
                res.status(403).json({ message: 'User is banned' });
                return;
            }

            req.user = {
                id: user.id,
                email: user.email,
                role: user.role,
                isBanned: user.isBanned
            };
            next();
        })
        .catch(() => {
            res.status(500).json({ message: 'Failed to authorize user' });
        });
};

export const requireAdmin = (req: AuthRequest, res: Response, next: NextFunction) => {
    if (req.user?.role !== 'admin') {
        return res.status(403).json({ message: 'Admin access required' });
    }
    next();
};

export const requireAdminOrOrganizer = (req: AuthRequest, res: Response, next: NextFunction) => {
    const role = req.user?.role;
    if (role !== 'admin' && role !== 'organizer') {
        return res.status(403).json({ message: 'Admin or organizer access required' });
    }
    next();
};

export const requireAdminKey = (req: Request, res: Response, next: NextFunction) => {
    const expectedKey = process.env.ADMIN_KEY || 'dev-admin-key';
    const headerKey = req.headers['x-admin-key'];
    const queryKey = req.query?.adminKey;
    const bodyKey = (req as any).body?.adminKey;
    const providedKey = (headerKey || queryKey || bodyKey) as string | undefined;

    if (!providedKey || providedKey !== expectedKey) {
        return res.status(403).json({ message: 'Invalid admin key' });
    }
    next();
};

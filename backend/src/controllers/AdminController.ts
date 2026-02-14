import { Request, Response } from 'express';
import { IAdminService } from '../interfaces/IAdminService';
import { User } from '../models/User';

const stripPassword = (user: User) => {
    const { password, ...safeUser } = user;
    return safeUser;
};

export class AdminController {
    constructor(private adminService: IAdminService) {}

    getSummary = async (req: Request, res: Response): Promise<void> => {
        try {
            const summary = await this.adminService.getSummary();
            res.status(200).json(summary);
        } catch (error: any) {
            res.status(500).json({ message: error?.message ?? 'Failed to load summary' });
        }
    };

    listUsers = async (req: Request, res: Response): Promise<void> => {
        try {
            const limitRaw = req.query?.limit;
            const limit = typeof limitRaw === 'string' ? Number(limitRaw) : 50;
            const users = await this.adminService.listUsers(limit);
            res.status(200).json({ users: users.map(stripPassword) });
        } catch (error: any) {
            res.status(500).json({ message: error?.message ?? 'Failed to load users' });
        }
    };

    assignRole = async (req: Request, res: Response): Promise<void> => {
        try {
            const { identifier, role } = req.body ?? {};
            if (!identifier || !role) {
                res.status(400).json({ message: 'Missing required fields' });
                return;
            }

            const user = await this.adminService.assignRole(String(identifier), String(role) as User['role']);
            res.status(200).json({ user: stripPassword(user) });
        } catch (error: any) {
            const message = error?.message ?? 'Failed to assign role';
            res.status(message.includes('not found') ? 404 : 400).json({ message });
        }
    };

    awardWin = async (req: Request, res: Response): Promise<void> => {
        try {
            const { identifier, contestId } = req.body ?? {};
            if (!identifier || !contestId) {
                res.status(400).json({ message: 'Missing required fields' });
                return;
            }

            const result = await this.adminService.awardWin(req.body);
            res.status(201).json({
                user: stripPassword(result.user),
                result: result.result
            });
        } catch (error: any) {
            const message = error?.message ?? 'Failed to award win';
            if (message.includes('not found')) {
                res.status(404).json({ message });
                return;
            }
            res.status(400).json({ message });
        }
    };

    banUser = async (req: Request, res: Response): Promise<void> => {
        try {
            const { identifier, isBanned } = req.body ?? {};
            if (!identifier) {
                res.status(400).json({ message: 'Missing required fields' });
                return;
            }

            const user = await this.adminService.banUser({
                identifier: String(identifier),
                isBanned: typeof isBanned === 'boolean' ? isBanned : true
            });
            res.status(200).json({ user: stripPassword(user) });
        } catch (error: any) {
            const message = error?.message ?? 'Failed to change user ban status';
            res.status(message.includes('not found') ? 404 : 400).json({ message });
        }
    };
}

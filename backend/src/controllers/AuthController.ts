import {Request, Response} from 'express';
import {IUserService} from '../interfaces/IUserService';

export class AuthController {
    constructor(private userService: IUserService) {
    }

    register = async (req: Request, res: Response): Promise<void> => {
        try {
            const {name, email, password, avatar, location} = req.body;
            if (!name || !email || !password) {
                res.status(400).json({message: 'Missing required fields'});
                return;
            }
            const user = await this.userService.register(name, email, password, avatar, location);
            res.status(201).json({message: 'User registered successfully', userId: user.id});
        } catch (error: any) {
            res.status(400).json({message: error.message});
        }
    };

    login = async (req: Request, res: Response): Promise<void> => {
        try {
            const {email, password} = req.body;
            if (!email || !password) {
                res.status(400).json({message: 'Missing required fields'});
                return;
            }
            const result = await this.userService.login(email, password);

            res.cookie('token', result.token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax', // or 'none' if cross-site but strict/lax is better for same domain/subdomain
                maxAge: 24 * 60 * 60 * 1000 // 1 day
            });

            res.status(200).json(result);
        } catch (error: any) {
            res.status(401).json({message: error.message});
        }
    };

    logout = async (req: Request, res: Response): Promise<void> => {
        res.clearCookie('token');
        res.status(200).json({message: 'Logged out successfully'});
    };

    getMe = async (req: Request, res: Response): Promise<void> => {
        try {
            // The user id should be attached to the request by the auth middleware
            const userId = (req as any).user?.id;

            if (!userId) {
                res.status(401).json({message: 'Unauthorized'});
                return;
            }

            const user = await this.userService.getUserById(userId);
            if (!user) {
                res.status(404).json({message: 'User not found'});
                return;
            }

            const {password: _, ...userWithoutPassword} = user;
            res.status(200).json(userWithoutPassword);
        } catch (error: any) {
            res.status(500).json({message: error.message});
        }
    };
}

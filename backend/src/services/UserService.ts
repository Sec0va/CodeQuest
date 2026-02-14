import {IUserService} from '../interfaces/IUserService';
import {IUserRepository} from '../interfaces/IUserRepository';
import {User} from '../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export class UserService implements IUserService {
    constructor(private userRepository: IUserRepository) {
    }

    async register(name: string, email: string, password: string, avatar?: string, location?: string): Promise<User> {
        const existingUser = await this.userRepository.findByEmail(email);
        if (existingUser) {
            throw new Error('User already exists');
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        // We let DB generate the ID (UUID)
        const newUser: User = {
            name,
            email,
            password: hashedPassword,
            role: email === 'admin@admin' ? 'admin' : 'user',
            isBanned: false,
            avatar: avatar || null,
            location: location || null,
            rating: 0,
            participations: 0,
            solved: 0
        } as User;

        return this.userRepository.create(newUser);
    }

    async login(email: string, password: string): Promise<{ token: string; user: Omit<User, 'password'> }> {
        const user = await this.userRepository.findByEmail(email);
        if (!user) {
            throw new Error('Invalid credentials');
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new Error('Invalid credentials');
        }
        if (user.isBanned) {
            throw new Error('User is banned');
        }

        const token = jwt.sign(
            {id: user.id, email: user.email, role: user.role, isBanned: user.isBanned},
            process.env.JWT_SECRET || 'secret_key',
            {expiresIn: '1d'}
        );

        const {password: _, ...userWithoutPassword} = user;

        return {token, user: userWithoutPassword};
    }

    async getUserById(id: string): Promise<User | null> {
        return this.userRepository.findById(id);
    }
}

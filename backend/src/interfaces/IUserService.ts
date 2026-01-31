import { User } from '../models/User';

export interface IUserService {
    register(name: string, email: string, password: string, avatar?: string, location?: string): Promise<User>;
    login(email: string, password: string): Promise<{ token: string; user: Omit<User, 'password'> }>;
    getUserById(id: string): Promise<User | null>;
}

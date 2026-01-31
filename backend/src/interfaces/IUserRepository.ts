import { User } from '../models/User';
export interface IUserRepository {
    findById(id: string): Promise<User | null>;
    create(user: User): Promise<User>;
    findByEmail(email: string): Promise<User | null>;
}


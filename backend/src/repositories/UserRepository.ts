import { IUserRepository } from '../interfaces/IUserRepository';
import { User } from '../models/User';
import { AppDataSource } from '../data-source';

export class UserRepository implements IUserRepository {
    private repository = AppDataSource.getRepository(User);

    async findByEmail(email: string): Promise<User | null> {
        return this.repository.findOneBy({ email });
    }

    async findById(id: string): Promise<User | null> {
        return this.repository.findOneBy({ id });
    }

    async create(user: User): Promise<User> {
        return this.repository.save(user);
    }
}

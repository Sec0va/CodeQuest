import { IUserRepository } from '../interfaces/IUserRepository';
import { User } from '../models/User';
import { AppDataSource } from '../data-source';

export class UserRepository implements IUserRepository {
    private repository = AppDataSource.getRepository(User);

    async findByEmail(email: string): Promise<User | null> {
        return this.repository.findOneBy({ email });
    }

    async findByName(name: string): Promise<User | null> {
        return this.repository.findOneBy({ name });
    }

    async findById(id: string): Promise<User | null> {
        return this.repository.findOneBy({ id });
    }

    async create(user: User): Promise<User> {
        return this.repository.save(user);
    }

    async save(user: User): Promise<User> {
        return this.repository.save(user);
    }

    async findAll(limit = 50): Promise<User[]> {
        return this.repository.find({
            take: limit,
            order: { rating: 'DESC' }
        });
    }

    async findTopRated(limit: number, excludeRoles: Array<User['role']> = []): Promise<User[]> {
        const query = this.repository.createQueryBuilder('user')
            .where('user.isBanned = :isBanned', { isBanned: false })
            .orderBy('user.rating', 'DESC')
            .take(limit);

        if (excludeRoles.length > 0) {
            query.andWhere('user.role NOT IN (:...roles)', { roles: excludeRoles });
        }

        return query.getMany();
    }

    async count(): Promise<number> {
        return this.repository.count();
    }
}

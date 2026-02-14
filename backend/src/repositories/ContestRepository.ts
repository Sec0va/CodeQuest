import { IContestRepository } from '../interfaces/IContestRepository';
import { Contest } from '../models/Contest';
import { AppDataSource } from '../data-source';
import { ContestCreateInput } from '../interfaces/IContestService';

export class ContestRepository implements IContestRepository {
    private repository = AppDataSource.getRepository(Contest);

    async getAll(): Promise<Contest[]> {
        return this.repository.find();
    }

    async getById(id: string): Promise<Contest | null> {
        return this.repository.findOneBy({ id });
    }

    async create(contest: ContestCreateInput): Promise<Contest> {
        const newContest = this.repository.create(contest);
        return this.repository.save(newContest);
    }

    async delete(id: string): Promise<boolean> {
        const result = await this.repository.delete(id);
        return (result.affected ?? 0) > 0;
    }

    async count(): Promise<number> {
        return this.repository.count();
    }
}

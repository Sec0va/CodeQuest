import { IContestRepository } from '../interfaces/IContestRepository';
import { Contest } from '../models/Contest';
import { AppDataSource } from '../data-source';

export class ContestRepository implements IContestRepository {
    private repository = AppDataSource.getRepository(Contest);

    async getAll(): Promise<Contest[]> {
        return this.repository.find();
    }

    async getById(id: string): Promise<Contest | null> {
        return this.repository.findOneBy({ id });
    }

    async create(contest: Contest): Promise<Contest> {
        const newContest = this.repository.create(contest);
        return this.repository.save(newContest);
    }
}

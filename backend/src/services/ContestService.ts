import {IContestService} from '../interfaces/IContestService';
import {IContestRepository} from '../interfaces/IContestRepository';
import {Contest} from '../models/Contest';

export class ContestService implements IContestService {
    constructor(private contestRepository: IContestRepository) {
    }

    async getAllContests(): Promise<Contest[]> {
        return this.contestRepository.getAll();
    }

    async getContestById(id: string): Promise<Contest | null> {
        return this.contestRepository.getById(id);
    }

    async createContest(contest: Contest): Promise<Contest> {
        // Business logic can go here (validation, etc.)
        return this.contestRepository.create(contest);
    }
}

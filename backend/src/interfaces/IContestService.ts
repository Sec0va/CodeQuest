import { Contest } from '../models/Contest';

export interface IContestService {
    getAllContests(): Promise<Contest[]>;
    getContestById(id: string): Promise<Contest | null>;
    createContest(contest: Contest): Promise<Contest>;
}

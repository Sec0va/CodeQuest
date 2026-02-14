import { Contest } from '../models/Contest';

export type ContestCreateInput = Omit<Contest, 'id'>;

export interface IContestService {
    getAllContests(): Promise<Contest[]>;
    getContestById(id: string): Promise<Contest | null>;
    createContest(contest: ContestCreateInput): Promise<Contest>;
    deleteContest(id: string): Promise<boolean>;
}

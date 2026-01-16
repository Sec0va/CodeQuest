import { Contest } from '../models/Contest';

export interface IContestRepository {
    getAll(): Promise<Contest[]>;
    getById(id: string): Promise<Contest | null>;
    create(contest: Contest): Promise<Contest>;
}

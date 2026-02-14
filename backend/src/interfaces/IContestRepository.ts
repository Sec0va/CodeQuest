import { Contest } from '../models/Contest';
import { ContestCreateInput } from './IContestService';

export interface IContestRepository {
    getAll(): Promise<Contest[]>;
    getById(id: string): Promise<Contest | null>;
    create(contest: ContestCreateInput): Promise<Contest>;
    delete(id: string): Promise<boolean>;
    count(): Promise<number>;
}

import { IContestRepository } from '../interfaces/IContestRepository';
import { Contest } from '../models/Contest';

export class ContestRepository implements IContestRepository {
    private contests: Contest[] = [
        {
            id: '1',
            title: 'Codeforces Round #920',
            platform: 'Codeforces',
            startTime: new Date(),
            duration: '2 hours',
            url: 'https://codeforces.com',
            description: 'Div 2 Round'
        },
        {
            id: '2',
            title: 'LeetCode Weekly 400',
            platform: 'LeetCode',
            startTime: new Date(),
            duration: '1.5 hours',
            url: 'https://leetcode.com',
            description: 'Weekly Contest'
        }
    ];

    async getAll(): Promise<Contest[]> {
        return this.contests;
    }

    async getById(id: string): Promise<Contest | null> {
        return this.contests.find(c => c.id === id) || null;
    }

    async create(contest: Contest): Promise<Contest> {
        this.contests.push(contest);
        return contest;
    }
}

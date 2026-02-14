import { ILeaderboardService, LeaderboardEntry } from '../interfaces/ILeaderboardService';
import { IUserRepository } from '../interfaces/IUserRepository';

export class LeaderboardService implements ILeaderboardService {
    constructor(private userRepository: IUserRepository) {}

    async getTopPlayers(limit: number): Promise<LeaderboardEntry[]> {
        const safeLimit = Number.isFinite(limit) ? Math.min(Math.max(1, Math.trunc(limit)), 20) : 3;
        const users = await this.userRepository.findTopRated(safeLimit, ['admin']);

        return users.map((user) => ({
            id: user.id,
            name: user.name,
            rating: user.rating ?? 0,
            avatar: user.avatar ?? undefined
        }));
    }
}

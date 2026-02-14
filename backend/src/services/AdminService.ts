import { IAdminService, AssignableRole, AwardWinPayload, AwardWinResult, AdminSummary, BanUserPayload } from '../interfaces/IAdminService';
import { IUserRepository } from '../interfaces/IUserRepository';
import { IContestRepository } from '../interfaces/IContestRepository';
import { IContestResultRepository } from '../interfaces/IContestResultRepository';
import { User } from '../models/User';
import { ContestResult } from '../models/ContestResult';

const ADMIN_EMAIL = 'admin@admin';
const ALLOWED_ROLES: AssignableRole[] = ['admin', 'organizer', 'user'];

export class AdminService implements IAdminService {
    constructor(
        private userRepository: IUserRepository,
        private contestRepository: IContestRepository,
        private contestResultRepository: IContestResultRepository
    ) {}

    private async findUserByIdentifier(identifier: string): Promise<User | null> {
        const trimmed = String(identifier ?? '').trim();
        if (!trimmed) {
            return null;
        }
        if (trimmed.includes('@')) {
            return this.userRepository.findByEmail(trimmed.toLowerCase());
        }

        const byId = await this.userRepository.findById(trimmed);
        if (byId) {
            return byId;
        }

        return this.userRepository.findByName(trimmed);
    }

    async assignRole(identifier: string, role: AssignableRole): Promise<User> {
        const normalizedRole = role as AssignableRole;
        if (!ALLOWED_ROLES.includes(normalizedRole)) {
            throw new Error('Invalid role');
        }

        const user = await this.findUserByIdentifier(identifier);
        if (!user) {
            throw new Error('User not found');
        }

        if (user.email === ADMIN_EMAIL && normalizedRole !== 'admin') {
            throw new Error('admin@admin must keep admin role');
        }

        user.role = normalizedRole;
        return this.userRepository.save(user);
    }

    async getSummary(): Promise<AdminSummary> {
        const [users, contests, results] = await Promise.all([
            this.userRepository.count(),
            this.contestRepository.count(),
            this.contestResultRepository.count()
        ]);

        return {
            users,
            contests,
            results,
            roles: ALLOWED_ROLES.length
        };
    }

    async listUsers(limit: number): Promise<User[]> {
        const safeLimit = Number.isFinite(limit) ? Math.min(Math.max(1, Math.trunc(limit)), 200) : 50;
        return this.userRepository.findAll(safeLimit);
    }

    async awardWin(payload: AwardWinPayload): Promise<AwardWinResult> {
        const { identifier, contestId } = payload;
        if (!identifier || !contestId) {
            throw new Error('Missing required fields');
        }

        const user = await this.findUserByIdentifier(identifier);
        if (!user) {
            throw new Error('User not found');
        }

        if (user.role === 'admin' || user.email === ADMIN_EMAIL) {
            throw new Error('Admins cannot participate');
        }

        const contest = await this.contestRepository.getById(contestId);
        if (!contest) {
            throw new Error('Contest not found');
        }

        const rank = Number.isFinite(payload.rank) ? Math.max(1, Math.trunc(payload.rank!)) : 1;
        const ratingDelta = Number.isFinite(payload.ratingDelta) ? Math.trunc(payload.ratingDelta!) : 0;
        const solved = Number.isFinite(payload.solved) ? Math.max(0, Math.trunc(payload.solved!)) : 0;

        await this.contestResultRepository.clearWinnersByContest(contest.id);

        const existing = await this.contestResultRepository.findByUserAndContest(user.id, contest.id);
        let result: ContestResult;

        if (existing) {
            const prevDelta = existing.ratingDelta ?? 0;
            const prevSolved = existing.solved ?? 0;

            existing.rank = rank;
            existing.ratingDelta = ratingDelta;
            existing.solved = solved;
            existing.isWinner = true;

            result = await this.contestResultRepository.save(existing);

            user.rating = (user.rating ?? 0) + (ratingDelta - prevDelta);
            user.solved = (user.solved ?? 0) + (solved - prevSolved);
        } else {
            result = await this.contestResultRepository.create({
                user,
                contest,
                rank,
                solved,
                ratingDelta,
                isWinner: true
            } as ContestResult);

            user.rating = (user.rating ?? 0) + ratingDelta;
            user.solved = (user.solved ?? 0) + solved;
            user.participations = (user.participations ?? 0) + 1;
        }

        await this.userRepository.save(user);

        return { user, result };
    }

    async banUser(payload: BanUserPayload): Promise<User> {
        const identifier = String(payload?.identifier ?? '').trim();
        if (!identifier) {
            throw new Error('Missing required fields');
        }

        const user = await this.findUserByIdentifier(identifier);
        if (!user) {
            throw new Error('User not found');
        }

        if (user.email === ADMIN_EMAIL || user.role === 'admin') {
            throw new Error('Admins cannot be banned');
        }

        user.isBanned = payload.isBanned === undefined ? true : Boolean(payload.isBanned);
        return this.userRepository.save(user);
    }
}

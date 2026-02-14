import { User } from '../models/User';
import { ContestResult } from '../models/ContestResult';

export type AssignableRole = User['role'];

export type AdminSummary = {
    users: number;
    contests: number;
    results: number;
    roles: number;
};

export type AwardWinPayload = {
    identifier: string;
    contestId: string;
    rank?: number;
    ratingDelta?: number;
    solved?: number;
};

export type AwardWinResult = {
    user: User;
    result: ContestResult;
};

export type BanUserPayload = {
    identifier: string;
    isBanned?: boolean;
};

export interface IAdminService {
    assignRole(identifier: string, role: AssignableRole): Promise<User>;
    getSummary(): Promise<AdminSummary>;
    listUsers(limit: number): Promise<User[]>;
    awardWin(payload: AwardWinPayload): Promise<AwardWinResult>;
    banUser(payload: BanUserPayload): Promise<User>;
}

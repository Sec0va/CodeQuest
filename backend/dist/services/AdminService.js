"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminService = void 0;
const ADMIN_EMAIL = 'admin@admin';
const ALLOWED_ROLES = ['admin', 'organizer', 'user'];
class AdminService {
    constructor(userRepository, contestRepository, contestResultRepository) {
        this.userRepository = userRepository;
        this.contestRepository = contestRepository;
        this.contestResultRepository = contestResultRepository;
    }
    findUserByIdentifier(identifier) {
        return __awaiter(this, void 0, void 0, function* () {
            const trimmed = String(identifier !== null && identifier !== void 0 ? identifier : '').trim();
            if (!trimmed) {
                return null;
            }
            if (trimmed.includes('@')) {
                return this.userRepository.findByEmail(trimmed.toLowerCase());
            }
            const byId = yield this.userRepository.findById(trimmed);
            if (byId) {
                return byId;
            }
            return this.userRepository.findByName(trimmed);
        });
    }
    assignRole(identifier, role) {
        return __awaiter(this, void 0, void 0, function* () {
            const normalizedRole = role;
            if (!ALLOWED_ROLES.includes(normalizedRole)) {
                throw new Error('Invalid role');
            }
            const user = yield this.findUserByIdentifier(identifier);
            if (!user) {
                throw new Error('User not found');
            }
            if (user.email === ADMIN_EMAIL && normalizedRole !== 'admin') {
                throw new Error('admin@admin must keep admin role');
            }
            user.role = normalizedRole;
            return this.userRepository.save(user);
        });
    }
    getSummary() {
        return __awaiter(this, void 0, void 0, function* () {
            const [users, contests, results] = yield Promise.all([
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
        });
    }
    listUsers(limit) {
        return __awaiter(this, void 0, void 0, function* () {
            const safeLimit = Number.isFinite(limit) ? Math.min(Math.max(1, Math.trunc(limit)), 200) : 50;
            return this.userRepository.findAll(safeLimit);
        });
    }
    awardWin(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c, _d, _e, _f, _g;
            const { identifier, contestId } = payload;
            if (!identifier || !contestId) {
                throw new Error('Missing required fields');
            }
            const user = yield this.findUserByIdentifier(identifier);
            if (!user) {
                throw new Error('User not found');
            }
            if (user.role === 'admin' || user.email === ADMIN_EMAIL) {
                throw new Error('Admins cannot participate');
            }
            const contest = yield this.contestRepository.getById(contestId);
            if (!contest) {
                throw new Error('Contest not found');
            }
            const rank = Number.isFinite(payload.rank) ? Math.max(1, Math.trunc(payload.rank)) : 1;
            const ratingDelta = Number.isFinite(payload.ratingDelta) ? Math.trunc(payload.ratingDelta) : 0;
            const solved = Number.isFinite(payload.solved) ? Math.max(0, Math.trunc(payload.solved)) : 0;
            yield this.contestResultRepository.clearWinnersByContest(contest.id);
            const existing = yield this.contestResultRepository.findByUserAndContest(user.id, contest.id);
            let result;
            if (existing) {
                const prevDelta = (_a = existing.ratingDelta) !== null && _a !== void 0 ? _a : 0;
                const prevSolved = (_b = existing.solved) !== null && _b !== void 0 ? _b : 0;
                existing.rank = rank;
                existing.ratingDelta = ratingDelta;
                existing.solved = solved;
                existing.isWinner = true;
                result = yield this.contestResultRepository.save(existing);
                user.rating = ((_c = user.rating) !== null && _c !== void 0 ? _c : 0) + (ratingDelta - prevDelta);
                user.solved = ((_d = user.solved) !== null && _d !== void 0 ? _d : 0) + (solved - prevSolved);
            }
            else {
                result = yield this.contestResultRepository.create({
                    user,
                    contest,
                    rank,
                    solved,
                    ratingDelta,
                    isWinner: true
                });
                user.rating = ((_e = user.rating) !== null && _e !== void 0 ? _e : 0) + ratingDelta;
                user.solved = ((_f = user.solved) !== null && _f !== void 0 ? _f : 0) + solved;
                user.participations = ((_g = user.participations) !== null && _g !== void 0 ? _g : 0) + 1;
            }
            yield this.userRepository.save(user);
            return { user, result };
        });
    }
    banUser(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const identifier = String((_a = payload === null || payload === void 0 ? void 0 : payload.identifier) !== null && _a !== void 0 ? _a : '').trim();
            if (!identifier) {
                throw new Error('Missing required fields');
            }
            const user = yield this.findUserByIdentifier(identifier);
            if (!user) {
                throw new Error('User not found');
            }
            if (user.email === ADMIN_EMAIL || user.role === 'admin') {
                throw new Error('Admins cannot be banned');
            }
            user.isBanned = payload.isBanned === undefined ? true : Boolean(payload.isBanned);
            return this.userRepository.save(user);
        });
    }
}
exports.AdminService = AdminService;

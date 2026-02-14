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
exports.LeaderboardService = void 0;
class LeaderboardService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    getTopPlayers(limit) {
        return __awaiter(this, void 0, void 0, function* () {
            const safeLimit = Number.isFinite(limit) ? Math.min(Math.max(1, Math.trunc(limit)), 20) : 3;
            const users = yield this.userRepository.findTopRated(safeLimit, ['admin']);
            return users.map((user) => {
                var _a, _b;
                return ({
                    id: user.id,
                    name: user.name,
                    rating: (_a = user.rating) !== null && _a !== void 0 ? _a : 0,
                    avatar: (_b = user.avatar) !== null && _b !== void 0 ? _b : undefined
                });
            });
        });
    }
}
exports.LeaderboardService = LeaderboardService;

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
exports.LeaderboardController = void 0;
class LeaderboardController {
    constructor(leaderboardService) {
        this.leaderboardService = leaderboardService;
        this.getTopPlayers = (req, res) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            try {
                const limitRaw = (_a = req.query) === null || _a === void 0 ? void 0 : _a.limit;
                const limit = typeof limitRaw === 'string' ? Number(limitRaw) : 3;
                const players = yield this.leaderboardService.getTopPlayers(limit);
                res.status(200).json({ players });
            }
            catch (error) {
                res.status(500).json({ message: (_b = error === null || error === void 0 ? void 0 : error.message) !== null && _b !== void 0 ? _b : 'Failed to load leaderboard' });
            }
        });
    }
}
exports.LeaderboardController = LeaderboardController;

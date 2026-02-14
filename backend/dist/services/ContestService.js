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
exports.ContestService = void 0;
class ContestService {
    constructor(contestRepository) {
        this.contestRepository = contestRepository;
    }
    getAllContests() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.contestRepository.getAll();
        });
    }
    getContestById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.contestRepository.getById(id);
        });
    }
    createContest(contest) {
        return __awaiter(this, void 0, void 0, function* () {
            // Business logic can go here (validation, etc.)
            return this.contestRepository.create(contest);
        });
    }
    deleteContest(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.contestRepository.delete(id);
        });
    }
}
exports.ContestService = ContestService;

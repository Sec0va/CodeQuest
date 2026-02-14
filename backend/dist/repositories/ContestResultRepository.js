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
exports.ContestResultRepository = void 0;
const data_source_1 = require("../data-source");
const ContestResult_1 = require("../models/ContestResult");
class ContestResultRepository {
    constructor() {
        this.repository = data_source_1.AppDataSource.getRepository(ContestResult_1.ContestResult);
    }
    create(result) {
        return __awaiter(this, void 0, void 0, function* () {
            const entity = this.repository.create(result);
            return this.repository.save(entity);
        });
    }
    findByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.repository.find({
                where: { user: { id: userId } },
                order: { createdAt: 'DESC' }
            });
        });
    }
    countWinsByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.repository.count({
                where: { user: { id: userId }, isWinner: true }
            });
        });
    }
    findByUserAndContest(userId, contestId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.repository.findOne({
                where: { user: { id: userId }, contest: { id: contestId } }
            });
        });
    }
    clearWinnersByContest(contestId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.repository
                .createQueryBuilder()
                .update(ContestResult_1.ContestResult)
                .set({ isWinner: false })
                .where('contestId = :contestId', { contestId })
                .andWhere('isWinner = :isWinner', { isWinner: true })
                .execute();
        });
    }
    count() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.repository.count();
        });
    }
    save(result) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.repository.save(result);
        });
    }
}
exports.ContestResultRepository = ContestResultRepository;

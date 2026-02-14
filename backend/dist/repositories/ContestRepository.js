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
exports.ContestRepository = void 0;
const Contest_1 = require("../models/Contest");
const data_source_1 = require("../data-source");
class ContestRepository {
    constructor() {
        this.repository = data_source_1.AppDataSource.getRepository(Contest_1.Contest);
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.repository.find();
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.repository.findOneBy({ id });
        });
    }
    create(contest) {
        return __awaiter(this, void 0, void 0, function* () {
            const newContest = this.repository.create(contest);
            return this.repository.save(newContest);
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const result = yield this.repository.delete(id);
            return ((_a = result.affected) !== null && _a !== void 0 ? _a : 0) > 0;
        });
    }
    count() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.repository.count();
        });
    }
}
exports.ContestRepository = ContestRepository;

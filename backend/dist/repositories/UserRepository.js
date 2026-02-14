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
exports.UserRepository = void 0;
const User_1 = require("../models/User");
const data_source_1 = require("../data-source");
class UserRepository {
    constructor() {
        this.repository = data_source_1.AppDataSource.getRepository(User_1.User);
    }
    findByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.repository.findOneBy({ email });
        });
    }
    findByName(name) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.repository.findOneBy({ name });
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.repository.findOneBy({ id });
        });
    }
    create(user) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.repository.save(user);
        });
    }
    save(user) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.repository.save(user);
        });
    }
    findAll() {
        return __awaiter(this, arguments, void 0, function* (limit = 50) {
            return this.repository.find({
                take: limit,
                order: { rating: 'DESC' }
            });
        });
    }
    findTopRated(limit_1) {
        return __awaiter(this, arguments, void 0, function* (limit, excludeRoles = []) {
            const query = this.repository.createQueryBuilder('user')
                .where('user.isBanned = :isBanned', { isBanned: false })
                .orderBy('user.rating', 'DESC')
                .take(limit);
            if (excludeRoles.length > 0) {
                query.andWhere('user.role NOT IN (:...roles)', { roles: excludeRoles });
            }
            return query.getMany();
        });
    }
    count() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.repository.count();
        });
    }
}
exports.UserRepository = UserRepository;

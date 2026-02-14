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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class UserService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    register(name, email, password, avatar, location) {
        return __awaiter(this, void 0, void 0, function* () {
            const existingUser = yield this.userRepository.findByEmail(email);
            if (existingUser) {
                throw new Error('User already exists');
            }
            const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
            // We let DB generate the ID (UUID)
            const newUser = {
                name,
                email,
                password: hashedPassword,
                role: email === 'admin@admin' ? 'admin' : 'user',
                isBanned: false,
                avatar: avatar || null,
                location: location || null,
                rating: 0,
                participations: 0,
                solved: 0
            };
            return this.userRepository.create(newUser);
        });
    }
    login(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepository.findByEmail(email);
            if (!user) {
                throw new Error('Invalid credentials');
            }
            const isPasswordValid = yield bcryptjs_1.default.compare(password, user.password);
            if (!isPasswordValid) {
                throw new Error('Invalid credentials');
            }
            if (user.isBanned) {
                throw new Error('User is banned');
            }
            const token = jsonwebtoken_1.default.sign({ id: user.id, email: user.email, role: user.role, isBanned: user.isBanned }, process.env.JWT_SECRET || 'secret_key', { expiresIn: '1d' });
            const { password: _ } = user, userWithoutPassword = __rest(user, ["password"]);
            return { token, user: userWithoutPassword };
        });
    }
    getUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.userRepository.findById(id);
        });
    }
}
exports.UserService = UserService;

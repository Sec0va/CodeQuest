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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
class AuthController {
    constructor(userService) {
        this.userService = userService;
        this.register = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, email, password, avatar, location } = req.body;
                if (!name || !email || !password) {
                    res.status(400).json({ message: 'Missing required fields' });
                    return;
                }
                const user = yield this.userService.register(name, email, password, avatar, location);
                res.status(201).json({ message: 'User registered successfully', userId: user.id });
            }
            catch (error) {
                res.status(400).json({ message: error.message });
            }
        });
        this.login = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                if (!email || !password) {
                    res.status(400).json({ message: 'Missing required fields' });
                    return;
                }
                const result = yield this.userService.login(email, password);
                res.cookie('token', result.token, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    sameSite: 'lax', // or 'none' if cross-site but strict/lax is better for same domain/subdomain
                    maxAge: 24 * 60 * 60 * 1000 // 1 day
                });
                res.status(200).json(result);
            }
            catch (error) {
                res.status(401).json({ message: error.message });
            }
        });
        this.logout = (req, res) => __awaiter(this, void 0, void 0, function* () {
            res.clearCookie('token');
            res.status(200).json({ message: 'Logged out successfully' });
        });
        this.getMe = (req, res) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                // The user id should be attached to the request by the auth middleware
                const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
                if (!userId) {
                    res.status(401).json({ message: 'Unauthorized' });
                    return;
                }
                const user = yield this.userService.getUserById(userId);
                if (!user) {
                    res.status(404).json({ message: 'User not found' });
                    return;
                }
                const { password: _ } = user, userWithoutPassword = __rest(user, ["password"]);
                res.status(200).json(userWithoutPassword);
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
    }
}
exports.AuthController = AuthController;

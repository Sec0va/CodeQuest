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
exports.AdminController = void 0;
const stripPassword = (user) => {
    const { password } = user, safeUser = __rest(user, ["password"]);
    return safeUser;
};
class AdminController {
    constructor(adminService) {
        this.adminService = adminService;
        this.getSummary = (req, res) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const summary = yield this.adminService.getSummary();
                res.status(200).json(summary);
            }
            catch (error) {
                res.status(500).json({ message: (_a = error === null || error === void 0 ? void 0 : error.message) !== null && _a !== void 0 ? _a : 'Failed to load summary' });
            }
        });
        this.listUsers = (req, res) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            try {
                const limitRaw = (_a = req.query) === null || _a === void 0 ? void 0 : _a.limit;
                const limit = typeof limitRaw === 'string' ? Number(limitRaw) : 50;
                const users = yield this.adminService.listUsers(limit);
                res.status(200).json({ users: users.map(stripPassword) });
            }
            catch (error) {
                res.status(500).json({ message: (_b = error === null || error === void 0 ? void 0 : error.message) !== null && _b !== void 0 ? _b : 'Failed to load users' });
            }
        });
        this.assignRole = (req, res) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            try {
                const { identifier, role } = (_a = req.body) !== null && _a !== void 0 ? _a : {};
                if (!identifier || !role) {
                    res.status(400).json({ message: 'Missing required fields' });
                    return;
                }
                const user = yield this.adminService.assignRole(String(identifier), String(role));
                res.status(200).json({ user: stripPassword(user) });
            }
            catch (error) {
                const message = (_b = error === null || error === void 0 ? void 0 : error.message) !== null && _b !== void 0 ? _b : 'Failed to assign role';
                res.status(message.includes('not found') ? 404 : 400).json({ message });
            }
        });
        this.awardWin = (req, res) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            try {
                const { identifier, contestId } = (_a = req.body) !== null && _a !== void 0 ? _a : {};
                if (!identifier || !contestId) {
                    res.status(400).json({ message: 'Missing required fields' });
                    return;
                }
                const result = yield this.adminService.awardWin(req.body);
                res.status(201).json({
                    user: stripPassword(result.user),
                    result: result.result
                });
            }
            catch (error) {
                const message = (_b = error === null || error === void 0 ? void 0 : error.message) !== null && _b !== void 0 ? _b : 'Failed to award win';
                if (message.includes('not found')) {
                    res.status(404).json({ message });
                    return;
                }
                res.status(400).json({ message });
            }
        });
    }
}
exports.AdminController = AdminController;

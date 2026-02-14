"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireAdminKey = exports.requireAdminOrOrganizer = exports.requireAdmin = exports.authenticateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const data_source_1 = require("../data-source");
const User_1 = require("../models/User");
const authenticateToken = (req, res, next) => {
    const token = req.cookies.token;
    const authHeader = req.headers['authorization'];
    const tokenHeader = authHeader && authHeader.split(' ')[1];
    const rawToken = token || tokenHeader;
    if (!rawToken) {
        res.sendStatus(401);
        return;
    }
    let payload;
    try {
        payload = jsonwebtoken_1.default.verify(rawToken, process.env.JWT_SECRET || 'secret_key');
    }
    catch (_error) {
        res.sendStatus(403);
        return;
    }
    const userId = typeof payload === 'object' && (payload === null || payload === void 0 ? void 0 : payload.id) ? String(payload.id) : '';
    if (!userId) {
        res.sendStatus(403);
        return;
    }
    data_source_1.AppDataSource.getRepository(User_1.User)
        .findOneBy({ id: userId })
        .then((user) => {
        if (!user) {
            res.status(401).json({ message: 'Unauthorized' });
            return;
        }
        if (user.isBanned) {
            res.status(403).json({ message: 'User is banned' });
            return;
        }
        req.user = {
            id: user.id,
            email: user.email,
            role: user.role,
            isBanned: user.isBanned
        };
        next();
    })
        .catch(() => {
        res.status(500).json({ message: 'Failed to authorize user' });
    });
};
exports.authenticateToken = authenticateToken;
const requireAdmin = (req, res, next) => {
    var _a;
    if (((_a = req.user) === null || _a === void 0 ? void 0 : _a.role) !== 'admin') {
        return res.status(403).json({ message: 'Admin access required' });
    }
    next();
};
exports.requireAdmin = requireAdmin;
const requireAdminOrOrganizer = (req, res, next) => {
    var _a;
    const role = (_a = req.user) === null || _a === void 0 ? void 0 : _a.role;
    if (role !== 'admin' && role !== 'organizer') {
        return res.status(403).json({ message: 'Admin or organizer access required' });
    }
    next();
};
exports.requireAdminOrOrganizer = requireAdminOrOrganizer;
const requireAdminKey = (req, res, next) => {
    var _a, _b;
    const expectedKey = process.env.ADMIN_KEY || 'dev-admin-key';
    const headerKey = req.headers['x-admin-key'];
    const queryKey = (_a = req.query) === null || _a === void 0 ? void 0 : _a.adminKey;
    const bodyKey = (_b = req.body) === null || _b === void 0 ? void 0 : _b.adminKey;
    const providedKey = (headerKey || queryKey || bodyKey);
    if (!providedKey || providedKey !== expectedKey) {
        return res.status(403).json({ message: 'Invalid admin key' });
    }
    next();
};
exports.requireAdminKey = requireAdminKey;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireAdminKey = exports.requireAdminOrOrganizer = exports.requireAdmin = exports.authenticateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authenticateToken = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        // Fallback to checking Authorization header if we still want to support it
        const authHeader = req.headers['authorization'];
        const tokenHeader = authHeader && authHeader.split(' ')[1];
        if (tokenHeader) {
            jsonwebtoken_1.default.verify(tokenHeader, process.env.JWT_SECRET || 'secret_key', (err, user) => {
                if (err)
                    return res.sendStatus(403);
                req.user = user;
                next();
            });
            return;
        }
        return res.sendStatus(401);
    }
    jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || 'secret_key', (err, user) => {
        if (err)
            return res.sendStatus(403);
        req.user = user;
        next();
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

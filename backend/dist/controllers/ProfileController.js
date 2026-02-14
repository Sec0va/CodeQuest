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
exports.ProfileController = void 0;
class ProfileController {
    constructor(profileService) {
        this.profileService = profileService;
        this.getProfile = (req, res) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c;
            try {
                const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
                if (!userId) {
                    res.status(401).json({ message: 'Unauthorized' });
                    return;
                }
                const profile = yield this.profileService.getProfile(userId);
                res.status(200).json(profile);
            }
            catch (error) {
                if ((_b = error === null || error === void 0 ? void 0 : error.message) === null || _b === void 0 ? void 0 : _b.includes('not found')) {
                    res.status(404).json({ message: error.message });
                    return;
                }
                res.status(500).json({ message: (_c = error.message) !== null && _c !== void 0 ? _c : 'Failed to load profile' });
            }
        });
        this.addResult = (req, res) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            try {
                const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
                if (!userId) {
                    res.status(401).json({ message: 'Unauthorized' });
                    return;
                }
                const profile = yield this.profileService.addResult(userId, req.body);
                res.status(201).json(profile);
            }
            catch (error) {
                const message = (_b = error === null || error === void 0 ? void 0 : error.message) !== null && _b !== void 0 ? _b : 'Failed to add result';
                if (message.includes('not found')) {
                    res.status(404).json({ message });
                    return;
                }
                res.status(400).json({ message });
            }
        });
    }
}
exports.ProfileController = ProfileController;

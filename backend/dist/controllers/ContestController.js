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
exports.ContestController = void 0;
class ContestController {
    constructor(contestService) {
        this.contestService = contestService;
        this.getAllContests = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const contests = yield this.contestService.getAllContests();
                res.status(200).json(contests);
            }
            catch (error) {
                res.status(500).json({ message: 'Internal Server Error' });
            }
        });
        this.getContestById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const contest = yield this.contestService.getContestById(req.params.id);
                if (!contest) {
                    res.status(404).json({ message: 'Contest not found' });
                    return;
                }
                res.status(200).json(contest);
            }
            catch (error) {
                res.status(500).json({ message: 'Internal Server Error' });
            }
        });
        this.createContest = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { title, platform, startTime, date, time, duration, url, description, difficulty, icon, imageUrl, background, } = req.body;
                let parsedStartTime = null;
                if (startTime) {
                    parsedStartTime = new Date(startTime);
                }
                else if (date && time) {
                    parsedStartTime = new Date(`${date}T${time}`);
                }
                if (!title || !platform || !parsedStartTime || Number.isNaN(parsedStartTime.getTime())) {
                    res.status(400).json({ message: 'Invalid contest payload' });
                    return;
                }
                const normalizeText = (value) => {
                    if (typeof value === 'string' && value.trim() === '')
                        return null;
                    return value !== null && value !== void 0 ? value : null;
                };
                const contest = yield this.contestService.createContest({
                    title,
                    platform,
                    startTime: parsedStartTime,
                    duration: normalizeText(duration),
                    url: normalizeText(url),
                    description: normalizeText(description),
                    difficulty: normalizeText(difficulty),
                    icon: normalizeText(icon),
                    imageUrl: normalizeText(imageUrl),
                    background: normalizeText(background),
                });
                res.status(201).json(contest);
            }
            catch (error) {
                res.status(500).json({ message: 'Internal Server Error' });
            }
        });
        this.deleteContest = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const deleted = yield this.contestService.deleteContest(req.params.id);
                if (!deleted) {
                    res.status(404).json({ message: 'Contest not found' });
                    return;
                }
                res.status(204).send();
            }
            catch (error) {
                res.status(500).json({ message: 'Internal Server Error' });
            }
        });
    }
}
exports.ContestController = ContestController;

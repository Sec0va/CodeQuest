"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ContestController_1 = require("../controllers/ContestController");
const ContestService_1 = require("../services/ContestService");
const ContestRepository_1 = require("../repositories/ContestRepository");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = (0, express_1.Router)();
// Manual Dependency Injection
const contestRepository = new ContestRepository_1.ContestRepository();
const contestService = new ContestService_1.ContestService(contestRepository);
const contestController = new ContestController_1.ContestController(contestService);
// Define Routes
router.get('/', contestController.getAllContests);
router.get('/:id', contestController.getContestById);
router.post('/', authMiddleware_1.authenticateToken, authMiddleware_1.requireAdminOrOrganizer, contestController.createContest);
router.delete('/:id', authMiddleware_1.authenticateToken, authMiddleware_1.requireAdmin, contestController.deleteContest);
exports.default = router;

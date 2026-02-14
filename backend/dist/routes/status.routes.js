"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const StatusController_1 = require("../controllers/StatusController");
const router = (0, express_1.Router)();
const statusController = new StatusController_1.StatusController();
router.get('/', statusController.getStatus);
exports.default = router;

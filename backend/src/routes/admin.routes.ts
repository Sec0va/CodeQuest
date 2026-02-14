import { Router } from 'express';
import { AdminController } from '../controllers/AdminController';
import { AdminService } from '../services/AdminService';
import { UserRepository } from '../repositories/UserRepository';
import { ContestRepository } from '../repositories/ContestRepository';
import { ContestResultRepository } from '../repositories/ContestResultRepository';
import { authenticateToken, requireAdmin } from '../middleware/authMiddleware';

const router = Router();

const adminService = new AdminService(
    new UserRepository(),
    new ContestRepository(),
    new ContestResultRepository()
);
const adminController = new AdminController(adminService);

router.get('/summary', authenticateToken, requireAdmin, adminController.getSummary);
router.get('/users', authenticateToken, requireAdmin, adminController.listUsers);
router.post('/assign-role', authenticateToken, requireAdmin, adminController.assignRole);
router.post('/award-win', authenticateToken, requireAdmin, adminController.awardWin);
router.post('/ban-user', authenticateToken, requireAdmin, adminController.banUser);

export default router;

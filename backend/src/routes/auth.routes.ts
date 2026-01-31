import { Router } from 'express';
import { AuthController } from '../controllers/AuthController';
import { UserService } from '../services/UserService';
import { UserRepository } from '../repositories/UserRepository';
import { authenticateToken } from '../middleware/authMiddleware';

const router = Router();
const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const authController = new AuthController(userService);

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/logout', authController.logout);
router.get('/me', authenticateToken, authController.getMe);

export default router;

import { Router } from 'express';
import contestRoutes from './contest.routes';
import authRoutes from './auth.routes';

const router = Router();

router.use('/contests', contestRoutes);
router.use('/auth', authRoutes);

export default router;

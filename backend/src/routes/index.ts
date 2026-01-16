import { Router } from 'express';
import contestRoutes from './contest.routes';

const router = Router();

router.use('/contests', contestRoutes);

export default router;

import { Router } from 'express';
import { ContestController } from '../controllers/ContestController';
import { ContestService } from '../services/ContestService';
import { ContestRepository } from '../repositories/ContestRepository';

const router = Router();

// Manual Dependency Injection
const contestRepository = new ContestRepository();
const contestService = new ContestService(contestRepository);
const contestController = new ContestController(contestService);

// Define Routes
router.get('/', contestController.getAllContests);
router.get('/:id', contestController.getContestById);
router.post('/', contestController.createContest);

export default router;

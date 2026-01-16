import { Request, Response } from 'express';
import { IContestService } from '../interfaces/IContestService';

export class ContestController {
    constructor(private contestService: IContestService) {}

    getAllContests = async (req: Request, res: Response): Promise<void> => {
        try {
            const contests = await this.contestService.getAllContests();
            res.status(200).json(contests);
        } catch (error) {
            res.status(500).json({ message: 'Internal Server Error' });
        }
    };

    getContestById = async (req: Request, res: Response): Promise<void> => {
        try {
            const contest = await this.contestService.getContestById(req.params.id);
            if (!contest) {
                res.status(404).json({ message: 'Contest not found' });
                return;
            }
            res.status(200).json(contest);
        } catch (error) {
            res.status(500).json({ message: 'Internal Server Error' });
        }
    };

    createContest = async (req: Request, res: Response): Promise<void> => {
        try {
            // Basic validation wrapper
            const contest = await this.contestService.createContest(req.body);
            res.status(201).json(contest);
        } catch (error) {
            res.status(500).json({ message: 'Internal Server Error' });
        }
    };
}

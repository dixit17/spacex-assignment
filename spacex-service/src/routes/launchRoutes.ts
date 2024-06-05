import { Router } from 'express';
import { fetchLaunches } from '../controller/launchController';
const router = Router();
router.get('/', fetchLaunches);

export default router;

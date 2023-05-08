import { Router } from 'express';
import userRoutes from '@/api/user/router';
import yearRoutes from '@/api/year/router';
const router = Router();

router.use('/user', userRoutes);
router.use('/year', yearRoutes);

export default router;

import { Router } from 'express';
import userRoutes from '@/api/user/router';
import yearRoutes from '@/api/year/router';
import memberRoutes from '@/api/member/router';
import intenrshipRoutes from '@/api/internship/router';
import instructorRoutes from '@/api/instructor/router';
const router = Router();

router.use('/internship', intenrshipRoutes);
router.use('/instructor', instructorRoutes);
router.use('/member', memberRoutes);
router.use('/user', userRoutes);
router.use('/year', yearRoutes);

export default router;

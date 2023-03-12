import { Router } from 'express';
import usersRoutes from './users';
import messagesRoutes from './messages';
import recieptsRoutes from './reciept';
const router = Router();

router.use('/users', usersRoutes);
router.use('/messages', messagesRoutes);
router.use('/reciepts', recieptsRoutes);

export default router;

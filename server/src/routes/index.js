import { Router } from 'express';
import localAuthRoutes from './localAuth';
import apiRoutes from './api';
const router = Router();

router.use('/api/auth', localAuthRoutes);
router.use('/api', apiRoutes);
// fallback 404
router.use('/api', (req, res) => res.status(404).json('No route for this path'));

export default router;

/*
routes:

POST /auth/login
POST /auth/register
GET /auth/logout

GET api/users/me
GET /api/users/feature

*/

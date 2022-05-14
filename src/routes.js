import { Router } from 'express';

import swaggerSpec from './utils/swagger';
import userRoutes from './routes/userRoutes';
import invoiceRoutes from './routes/invoiceRoutes';
import asuransiRoutes from './routes/asuransiRoutes';
import requestRoutes from './routes/requestRoutes';
import authRoutes from './routes/authRoutes';

/**
 * Contains all API routes for the application.
 */
const router = Router();

/**
 * GET /api/swagger.json.
 */
router.get('/swagger.json', (req, res) => {
  res.json(swaggerSpec);
});

/**
 * GET /api.
 */
router.get('/', (req, res) => {
  res.json({
    app: req.app.locals.title,
    apiVersion: req.app.locals.version
  });
});

router.use('/users', userRoutes);
router.use('/asuransi', asuransiRoutes);
router.use('/invoice', invoiceRoutes);
router.use('/request', requestRoutes);
router.use('/auth', authRoutes);

export default router;

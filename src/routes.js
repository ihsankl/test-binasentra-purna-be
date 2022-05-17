import { Router } from 'express';

import swaggerSpec from './utils/swagger';
import userRoutes from './routes/userRoutes';
import invoiceRoutes from './routes/invoiceRoutes';
import asuransiRoutes from './routes/asuransiRoutes';
import authRoutes from './routes/authRoutes';
import ratePremiRoutes from './routes/ratePremiRoutes';
import okupasiRoutes from './routes/okupasiRoutes';

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
router.use('/auth', authRoutes);
router.use('/ratepremi', ratePremiRoutes);
router.use('/okupasi', okupasiRoutes);

export default router;

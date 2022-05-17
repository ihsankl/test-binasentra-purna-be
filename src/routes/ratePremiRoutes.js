import { Router } from 'express';
import auth from '../middlewares/auth';

import * as invoiceController from '../controllers/invoice';

const router = Router();

/**
 * GET /api/ratepremi.
 */
router.get('/', invoiceController.fetchAllRatePremi);

/**
 * GET /api/ratepremi/:id.
 */
router.get('/:id', invoiceController.fetchRatePremiById);

/**
 * POST /api/ratepremi.
 */
router.post('/', auth('manageRatePremi'), invoiceController.createRatePremi);

/**
 * PUT /api/ratepremi/:id.
 */
router.put('/:id', auth('manageRatePremi'), invoiceController.updateRatePremi);

/**
 * DELETE /api/ratepremi/:id.
 */
router.delete('/:id', auth('manageRatePremi'), invoiceController.deleteRatePremi);

export default router;

import { Router } from 'express';
import auth from '../middlewares/auth';

import * as invoiceController from '../controllers/invoice';

const router = Router();

/**
 * GET /api/invoice.
 */
router.get('/', invoiceController.fetchAll);

/**
 * GET /api/invoice/:id.
 */
router.get('/:id', auth('manageInvoice'), invoiceController.fetchById);

/**
 * POST /api/invoice.
 */
router.post('/', auth('manageInvoice', 'createInvoice'), invoiceController.create);

/**
 * PUT /api/invoice/:id.
 */
router.put('/:id', auth('manageInvoice'), invoiceController.update);

/**
 * DELETE /api/invoice/:id.
 */
router.delete('/:id', auth('manageInvoice'), invoiceController.deleteInvoice);

export default router;

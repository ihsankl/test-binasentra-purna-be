import { Router } from 'express';
import auth from '../middlewares/auth';

import * as invoiceController from '../controllers/invoice';

const router = Router();

/**
 * GET /api/invoice.
 */
router.get('/', invoiceController.fetchAll);

/**
 * GET /api/invoice/last.
 */
router.get('/last', invoiceController.fetchLastInvoice);

/**
 * GET /api/invoice/ratepremi.
 */
router.get('/ratepremi', invoiceController.fetchAll);

/**
 * GET /api/invoice/ratepremi/:id.
 */
router.get('/ratepremi/:id', invoiceController.fetchById);

/**
 * GET /api/invoice/:id.
 */
router.get('/:id', invoiceController.fetchById);

/**
 * POST /api/invoice.
 */
router.post('/', auth('createInvoice'), invoiceController.create);

/**
 * POST /api/invoice/ratepremi.
 */
router.post('/ratepremi', auth('createRatePremi'), invoiceController.create);


/**
 * PUT /api/invoice/:id.
 */
router.put('/:id', auth('updateInvoice'), invoiceController.update);

/**
 * PUT /api/invoice/ratepremi/:id.
 */
router.put('/ratepremi/:id', auth('updateRatePremi'), invoiceController.update);


/**
 * DELETE /api/invoice/:id.
 */
router.delete('/:id', auth('deleteInvoice'), invoiceController.deleteInvoice);

/**
 * DELETE /api/invoice/ratepremi/:id.
 */
router.delete('/ratepremi/:id', auth('deleteRatePremi'), invoiceController.deleteInvoice);


export default router;

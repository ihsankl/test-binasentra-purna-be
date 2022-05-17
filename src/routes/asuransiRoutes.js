import { Router } from 'express';

import auth from '../middlewares/auth';

import * as asuransiController from '../controllers/asuransi-kebakaran';

const router = Router();

/**
 * GET /api/asuransi.
 */
router.get('/', asuransiController.fetchAll);

/**
 * GET /api/asuransi/last.
 */
router.get('/last', asuransiController.fetchLastInvoice);


/**
 * GET /api/asuransi/:id.
 */
router.get('/:id', asuransiController.fetchById);

/**
 * POST /api/asuransi.
 */
router.post('/', auth('createAsuransi'), asuransiController.create);

/**
 * PUT /api/asuransi/:id.
 */
router.put('/:id', auth('updateAsuransi'), asuransiController.update);

/**
 * DELETE /api/asuransi/:id.
 */
router.delete('/:id', auth('deleteAsuransi'), asuransiController.deleteAsuransi);

export default router;

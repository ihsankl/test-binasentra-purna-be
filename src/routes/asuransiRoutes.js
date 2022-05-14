import { Router } from 'express';

import auth from '../middlewares/auth';

import * as asuransiController from '../controllers/asuransi-kebakaran';

const router = Router();

/**
 * GET /api/asuransi.
 */
router.get('/', asuransiController.fetchAll);

/**
 * GET /api/asuransi/:id.
 */
router.get('/:id', asuransiController.fetchById);

/**
 * POST /api/asuransi.
 */
router.post('/', auth('manageAsuransi', 'createAsuransi'), asuransiController.create);

/**
 * PUT /api/asuransi/:id.
 */
router.put('/:id', auth('manageAsuransi'), asuransiController.update);

/**
 * DELETE /api/asuransi/:id.
 */
router.delete('/:id', auth('manageAsuransi'), asuransiController.deleteAsuransi);

export default router;

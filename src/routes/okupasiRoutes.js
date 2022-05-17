import { Router } from 'express';
import auth from '../middlewares/auth';

import * as asuransiKebakaranController from '../controllers/asuransi-kebakaran';

const router = Router();

/**
 * GET /api/okupasi.
 */
router.get('/', asuransiKebakaranController.fetchAllOkupasi);

/**
 * GET /api/okupasi/:id.
 */
router.get('/:id', asuransiKebakaranController.fetchOkupasiById);

/**
 * POST /api/okupasi.
 */
router.post('/', auth('manageOkupasi'), asuransiKebakaranController.createOkupasi);

/**
 * PUT /api/okupasi/:id.
 */
router.put('/:id', auth('manageOkupasi'), asuransiKebakaranController.updateOkupasi);

/**
 * DELETE /api/okupasi/:id.
 */
router.delete('/:id', auth('manageOkupasi'), asuransiKebakaranController.deleteOkupasi);

export default router;

import { Router } from 'express';
import auth from '../middlewares/auth';
import * as requestController from '../controllers/request';

const router = Router();

/**
 * GET /api/request.
 */
router.get('/', requestController.fetchAll);

/**
 * GET /api/request/:id.
 */
router.get('/:id', requestController.fetchById);

/**
 * POST /api/request.
 */
router.post('/', auth('manageRequest', 'createRequest'), requestController.create);

/**
 * PUT /api/request/:id.
 */
router.put('/:id', auth('manageRequest'), requestController.update);

/**
 * DELETE /api/request/:id.
 */
router.delete('/:id', auth('manageRequest'), requestController.deleteRequest);

export default router;

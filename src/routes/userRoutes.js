import { Router } from 'express';
import auth from '../middlewares/auth';

import * as userController from '../controllers/users';

const router = Router();

/**
 * GET /api/users.
 */
router.get('/', userController.fetchAll);

/**
 * GET /api/users/:id.
 */
router.get('/:id', userController.fetchById);

/**
 * POST /api/users.
 */
router.post('/', auth('manageUsers'), userController.create);

/**
 * PUT /api/users/:id.
 */
router.put('/:id', auth('manageUsers'), userController.update);

/**
 * DELETE /api/users/:id.
 */
router.delete('/:id', auth('manageUsers'), userController.deleteUser);

export default router;

import { Router } from 'express';
import auth from '../middlewares/auth';
import * as authController from '../controllers/auth.controller';

const router = Router();

/**
 * POST /api/auth/register.
 */
router.post('/register', authController.register);

/**
 * POST /api/auth/login.
 */
router.post('/login', authController.login);

/**
 * POST /api/auth/logout.
 */
router.post('/logout', auth(), authController.logout);

/**
 * POST /api/auth/refresh-tokens.
 */
router.post('/refresh-tokens', authController.refreshTokens);

/**
 * POST /api/auth/forgot-password.
 */
router.post('/forgot-password', authController.forgotPassword);

/**
 * POST /api/auth/reset-password.
 */
router.post('/reset-password', authController.resetPassword);

/**
* POST /api/auth/send-verification-email.
*/
router.post('/send-verification-email', authController.sendVerificationEmail);

/**
 * POST /api/auth/verify-email.
 */
router.post('/verify-email', authController.verifyEmail);

export default router;

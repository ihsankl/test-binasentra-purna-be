import * as authService from '../services/authService';
import * as userService from '../services/userService';
import * as tokenService from '../services/tokenService';

/**
 * Register an account.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export async function register(req, res, next) {
    try {
        const user = await userService.createUser(req.body);
        const tokens = await tokenService.generateAuthTokens(user);

        res.json(tokens);

    } catch (error) {
        next(error);
    }

}

/**
 * Login an account.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export async function login(req, res, next) {
    try {
        const { email, password } = req.body;
        const user = await authService.loginUserWithEmailAndPassword(email, password);
        const tokens = await tokenService.generateAuthTokens(user);

        res.json({ tokens })

    } catch (error) {
        next(error);
    }
}

/**
 * Logout an account.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export function logout(req, res, next) {
    authService.logout(req.body.refreshToken)
        .then(data => res.json({ data }))
        .catch(err => next(err));
}

/**
 * Refresh token.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export function refreshTokens(req, res, next) {
    authService.refreshAuth(req.body.refreshToken)
        .then(data => res.json({ data }))
        .catch(err => next(err));
}

/**
 * Forgot password.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export function forgotPassword(req, res, next) {
    tokenService.generateResetPasswordToken(req.body.email)
        .then(data => res.json({ data }))
        .catch(err => next(err));
}

/**
 * Reset password.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export function resetPassword(req, res, next) {
    authService.resetPassword(req.query.token, req.body.password)
        .then(data => res.json({ data }))
        .catch(err => next(err));
}

/**
 * Send verification email.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export function sendVerificationEmail(req, res, next) {
    tokenService.generateVerifyEmailToken(req.user)
        .then(data => res.json({ data }))
        .catch(err => next(err));
}

/**
 * Verification email.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export function verifyEmail(req, res, next) {
    authService.verifyEmail(req.query.token)
        .then(data => res.json({ data }))
        .catch(err => next(err));
}
import { Boom } from "@hapi/boom";
import Token from "../models/token";
import * as userService from '../services/userService'
import * as tokenService from '../services/tokenService'
import { tokenTypes } from "../config/tokens";

/**
 * Login with username and password.
 * 
 * @param {string} email
 * @param {string} password
 * @returns {Promise<import("../models/user").User>}
 */
export const loginUserWithEmailAndPassword = async (email, password) => {
    const user = await userService.getUserByEmail(email);

    if (!user || !(await user.isPasswordMatch(password))) {
        throw Boom.unauthorized('Incorrect email or password.');
    }

    return user;
};

/**
 * Logout.
 * 
 * @param {string} refreshToken
 * @returns {Promise}
 */
export const logout = async (refreshToken) => {
    const refreshTokenDoc = await Token.findOne({ token: refreshToken, type: tokenTypes.REFRESH, blacklisted: false });

    if (!refreshTokenDoc) {
        throw Boom.unauthorized('Not found.');
    }
    await refreshTokenDoc.remove();
};

/**
 * Refresh auth tokens.
 * 
 * @param {string} refreshToken
 * @returns {Promise<Object>}
 */
export const refreshAuth = async (refreshToken) => {
    try {
        const refreshTokenDoc = await tokenService.verifyToken(refreshToken, tokenTypes.REFRESH);
        const user = await userService.getUserById(refreshTokenDoc.user);

        if (!user) {
            throw new Error();
        }
        await refreshTokenDoc.remove();

        return tokenService.generateAuthTokens(user);
    } catch (error) {
        throw Boom.unauthorized('Please authenticate');
    }
};

/**
 * Reset password.
 * 
 * @param {string} resetPasswordToken
 * @param {string} newPassword
 * @returns {Promise}
 */
export const resetPassword = async (resetPasswordToken, newPassword) => {
    try {
        const resetPasswordTokenDoc = await tokenService.verifyToken(resetPasswordToken, tokenTypes.RESET_PASSWORD);
        const user = await userService.getUserById(resetPasswordTokenDoc.user);

        if (!user) {
            throw new Error();
        }
        await userService.updateUserById(user.id, { password: newPassword });
        await Token.deleteMany({ user: user.id, type: tokenTypes.RESET_PASSWORD });
    } catch (error) {
        throw Boom.unauthorized('Password reset failed');
    }
};

/**
 * Verify email.
 * 
 * @param {string} verifyEmailToken
 * @returns {Promise}
 */
export const verifyEmail = async (verifyEmailToken) => {
    try {
        const verifyEmailTokenDoc = await tokenService.verifyToken(verifyEmailToken, tokenTypes.VERIFY_EMAIL);
        const user = await userService.getUserById(verifyEmailTokenDoc.user);

        if (!user) {
            throw new Error();
        }
        await Token.deleteMany({ user: user.id, type: tokenTypes.VERIFY_EMAIL });
        await userService.updateUserById(user.id, { isEmailVerified: true });
    } catch (error) {
        throw new Boom.unauthorized('Email verification failed');
    }
};
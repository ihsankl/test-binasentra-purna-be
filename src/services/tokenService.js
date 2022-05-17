import Boom from "@hapi/boom";
import jwt from "jsonwebtoken";
import moment from "moment";
import Token from "../models/token";
import { config } from '../config/config';
import { tokenTypes } from '../config/tokens'

/**
 * Generate token.
 * 
 * @param {ObjectId} userId
 * @param {Moment} expires
 * @param {string} type
 * @param {string} [secret]
 * @returns {string}
 */
export const generateToken = (userId, expires, type, secret = config.jwt.secret) => {
    const payload = {
        sub: userId,
        iat: moment().unix(),
        exp: expires.unix(),
        type,
    };

    return jwt.sign(payload, secret);
};

/**
 * Save a token.
 * 
 * @param {string} token
 * @param {ObjectId} userId
 * @param {Moment} expires
 * @param {string} type
 * @param {boolean} [blacklisted]
 * @returns {Promise<Token>}
 */
export const saveToken = async (token, userId, expires, type, blacklisted = false) => {
    const tokenDoc = await Token.create({
        token,
        user: userId,
        expires: expires.toDate(),
        type,
        blacklisted,
    });

    return tokenDoc;
};

/**
 * Verify token and return token doc (or throw an error if it is not valid).
 * 
 * @param {string} token
 * @param {string} type
 * @returns {Promise<Token>}
 */
export const verifyToken = async (token, type) => {
    const payload = jwt.verify(token, config.jwt.secret);
    const tokenDoc = await Token.findOne({ token, type, user: payload.sub, blacklisted: false });

    if (!tokenDoc) {
        throw Boom.unauthorized('Invalid token');
    }

    return tokenDoc;
};

/**
 * Generate auth tokens.
 * 
 * @param {User} user
 * @returns {Promise<Object>}
 */
export const generateAuthTokens = async (user) => {
    const accessTokenExpires = moment().add(config.jwt.accessExpirationMinutes, 'minutes');
    const accessToken = generateToken(user.id, accessTokenExpires, tokenTypes.ACCESS);

    const refreshTokenExpires = moment().add(config.jwt.refreshExpirationDays, 'days');
    const refreshToken = generateToken(user.id, refreshTokenExpires, tokenTypes.REFRESH);

    await saveToken(refreshToken, user.id, refreshTokenExpires, tokenTypes.REFRESH);

    return {
        access: {
            token: accessToken,
            expires: accessTokenExpires.toDate(),
        },
        refresh: {
            token: refreshToken,
            expires: refreshTokenExpires.toDate(),
        },
    };
};
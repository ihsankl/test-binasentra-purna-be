// const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
// const config = require('./config');
// const { User } = require('../models');
// const { tokenTypes } = require('./tokens');

import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { config } from './config';
import User from "../models/user";
import { tokenTypes } from './tokens';
import Boom from '@hapi/boom';

const jwtOptions = {
    secretOrKey: config.jwt.secret,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

const jwtVerify = async (payload, done) => {
    try {
        if (payload.type !== tokenTypes.ACCESS) {
            throw Boom.unauthorized('Invalid token type');
        }
        const user = await User.findById(payload.sub);

        if (!user) {
            return done(null, false);
        }
        done(null, user);
    } catch (error) {
        done(error, false);
    }
};

const jwtStrategy = new JwtStrategy(jwtOptions, jwtVerify);

export { jwtStrategy };

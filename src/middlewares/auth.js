import Boom from '@hapi/boom';
import passport from 'passport';
import { roleRights } from '../config/roles';

// eslint-disable-next-line require-await
const verifyCallback = (req, resolve, reject, requiredRights) => async (err, user, info) => {
    if (err || info || !user) {
        throw Boom.unauthorized('Please authenticate');
    }
    req.user = user;

    if (requiredRights.length) {
        const userRights = roleRights.get(user.role);
        const hasRequiredRights = requiredRights.every((requiredRight) => userRights.includes(requiredRight));

        if (!hasRequiredRights && req.params.userId !== user.id) {
            throw Boom.forbidden('You do not have the required rights');
        }
    }

    resolve();
};

// eslint-disable-next-line require-await
const auth = (...requiredRights) => async (req, res, next) => {
    return new Promise((resolve, reject) => {
        passport.authenticate('jwt', { session: false }, verifyCallback(req, resolve, reject, requiredRights))(req, res, next);
    })
        .then(() => next())
        .catch((err) => next(err));
};

export default auth;

import HttpStatus from 'http-status-codes';

import * as requestService from '../services/requestService';
import pick from '../utils/pick';

/**
 * Get all request.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export function fetchAll(req, res, next) {
    const filter = pick(req.query, ['name', 'role']);
    const options = pick(req.query, ['sortBy', 'limit', 'page']);

    requestService
        .getAllRequest(filter, options)
        .then(data => res.json({ data }))
        .catch(err => next(err));
}

/**
* Get a request by its id.
*
* @param {Object} req
* @param {Object} res
* @param {Function} next
*/
export function fetchById(req, res, next) {
    requestService
        .getRequest(req.params.id)
        .then(data => res.json({ data }))
        .catch(err => next(err));
}

/**
* Create a new request.
*
* @param {Object} req
* @param {Object} res
* @param {Function} next
*/
export function create(req, res, next) {
    requestService
        .createRequest(req.body)
        .then(data => res.status(HttpStatus.CREATED).json({ data }))
        .catch(err => next(err));
}

/**
* Update a request.
*
* @param {Object} req
* @param {Object} res
* @param {Function} next
*/
export function update(req, res, next) {
    requestService
        .updateRequest(req.params.id, req.body)
        .then(data => res.json({ data }))
        .catch(err => next(err));
}

/**
* Delete a request.
*
* @param {Object} req
* @param {Object} res
* @param {Function} next
*/
export function deleteRequest(req, res, next) {
    requestService
        .deleteRequest(req.params.id)
        .then(data => res.status(HttpStatus.NO_CONTENT).json({ data }))
        .catch(err => next(err));
}
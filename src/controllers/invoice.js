import HttpStatus from 'http-status-codes';

import * as invoiceService from '../services/invoiceService';
import pick from '../utils/pick';

/**
 * Get all invoice.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export function fetchAll(req, res, next) {
    const filter = pick(req.query, ['name', 'role']);
    const options = pick(req.query, ['sortBy', 'limit', 'page']);

    invoiceService
        .getAllInvoice(filter, options)
        .then(data => res.json({ data }))
        .catch(err => next(err));
}

/**
* Get a invoice by its id.
*
* @param {Object} req
* @param {Object} res
* @param {Function} next
*/
export function fetchById(req, res, next) {
    invoiceService
        .getInvoice(req.params.id)
        .then(data => res.json({ data }))
        .catch(err => next(err));
}

/**
* Create a new invoice.
*
* @param {Object} req
* @param {Object} res
* @param {Function} next
*/
export function create(req, res, next) {
    invoiceService
        .createInvoice(req.body)
        .then(data => res.status(HttpStatus.CREATED).json({ data }))
        .catch(err => next(err));
}

/**
* Update a invoice.
*
* @param {Object} req
* @param {Object} res
* @param {Function} next
*/
export function update(req, res, next) {
    invoiceService
        .updateInvoice(req.params.id, req.body)
        .then(data => res.json({ data }))
        .catch(err => next(err));
}

/**
* Delete a invoice.
*
* @param {Object} req
* @param {Object} res
* @param {Function} next
*/
export function deleteInvoice(req, res, next) {
    invoiceService
        .deleteInvoice(req.params.id)
        .then(data => res.status(HttpStatus.NO_CONTENT).json({ data }))
        .catch(err => next(err));
}
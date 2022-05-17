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
    const filter = pick(req.query, [
        'jangkaWaktuPertanggungan',
        'okupasi',
        'hargaBangunan',
        'konstruksi',
        'alamat',
        'provinsi',
        'kota',
        'kabupaten',
        'daerah',
        'gempa',
    ]);
    const options = pick(req.query, ['sortBy', 'limit', 'page']);

    invoiceService
        .getAllInvoice(filter, options)
        .then(data => res.json({ data }))
        .catch(err => next(err));
}

/**
 * Get all Rate Premi.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export function fetchAllRatePremi(req, res, next) {

    invoiceService
        .getAllRatePremi()
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
* Get last invoice.
*
* @param {Object} req
* @param {Object} res
* @param {Function} next
*/
export function fetchLastInvoice(req, res, next) {
    invoiceService
        .getLastInvoice()
        .then(data => res.json({ data }))
        .catch(err => next(err));
}

/**
* Get a Rate Premi by its id.
*
* @param {Object} req
* @param {Object} res
* @param {Function} next
*/
export function fetchRatePremiById(req, res, next) {
    invoiceService
        .getRatePremi(req.params.id)
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
    const data = { ...req.body }
    // premiDasar = hargaBangunan x ratePremi /1000 x periode(in years)
    const premiDasar = data.hargaBangunan * data.ratePremi / 1000 * data.periode;

    const total = parseInt(premiDasar) + 10000;

    invoiceService
        .createInvoice({ ...data, premiDasar, total })
        .then(data => res.status(HttpStatus.CREATED).json({ data }))
        .catch(err => next(err));
}

/**
* Create a new rate premi.
*
* @param {Object} req
* @param {Object} res
* @param {Function} next
*/
export function createRatePremi(req, res, next) {
    const data = { ...req.body }

    invoiceService
        .createRatePremi(data)
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
* Update a rate premi.
*
* @param {Object} req
* @param {Object} res
* @param {Function} next
*/
export function updateRatePremi(req, res, next) {
    invoiceService
        .updateRatePremi(req.params.id, req.body)
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

/**
* Delete a rate premi.
*
* @param {Object} req
* @param {Object} res
* @param {Function} next
*/
export function deleteRatePremi(req, res, next) {
    invoiceService
        .deleteRatePremi(req.params.id)
        .then(data => res.status(HttpStatus.NO_CONTENT).json({ data }))
        .catch(err => next(err));
}
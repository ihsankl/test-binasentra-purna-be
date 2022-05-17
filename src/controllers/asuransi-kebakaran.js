import HttpStatus from 'http-status-codes';

import * as asuransiService from '../services/asuransiService';
import pick from '../utils/pick';

/**
 * Get all asuransi.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export function fetchAll(req, res, next) {
    const filter = pick(req.query, [
        "jangkaWaktuPertanggungan",
        "okupasi",
        "hargaBangunan",
        "konstruksi",
        "alamat",
        "provinsi",
        "kota",
        "kabupaten",
        "daerah",
        "gempa",
        "nomorPolis",
        "jenisPenanggungan",
        "nomorInvoice",
        "status",
        "userId",
    ]);
    const options = pick(req.query, ['sortBy', 'limit', 'page']);

    asuransiService
        .getAllAsuransi(filter, options)
        .then(data => res.json({ data }))
        .catch(err => next(err));
}

/**
 * Get all asuransi.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export function fetchAllOkupasi(req, res, next) {
    asuransiService
        .getAllOkupasi()
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
    asuransiService
        .getLastInvoice()
        .then(data => res.json({ data }))
        .catch(err => next(err));
}

/**
 * Get a asuransi by its id.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export function fetchById(req, res, next) {
    asuransiService
        .getAsuransi(req.params.id)
        .then(data => res.json({ data }))
        .catch(err => next(err));
}

/**
 * Get a okupasi by its id.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export function fetchOkupasiById(req, res, next) {
    asuransiService
        .getOkupasi(req.params.id)
        .then(data => res.json({ data }))
        .catch(err => next(err));
}

/**
* Create a new asuransi.
*
* @param {Object} req
* @param {Object} res
* @param {Function} next
*/
export function create(req, res, next) {
    asuransiService
        .createAsuransi(req.body)
        .then(data => res.status(HttpStatus.CREATED).json({ data }))
        .catch(err => next(err));
}

/**
* Create a new okupasi.
*
* @param {Object} req
* @param {Object} res
* @param {Function} next
*/
export function createOkupasi(req, res, next) {
    asuransiService
        .createOkupasi(req.body)
        .then(data => res.status(HttpStatus.CREATED).json({ data }))
        .catch(err => next(err));
}

/**
* Update a asuransi.
*
* @param {Object} req
* @param {Object} res
* @param {Function} next
*/
export function update(req, res, next) {
    asuransiService
        .updateAsuransi(req.params.id, req.body)
        .then(data => res.json({ data }))
        .catch(err => next(err));
}

/**
* Update a okupasi.
*
* @param {Object} req
* @param {Object} res
* @param {Function} next
*/
export function updateOkupasi(req, res, next) {
    asuransiService
        .updateOkupasi(req.params.id, req.body)
        .then(data => res.json({ data }))
        .catch(err => next(err));
}

/**
 * Delete a asuransi.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export function deleteAsuransi(req, res, next) {
    asuransiService
        .deleteAsuransi(req.params.id)
        .then(data => res.status(HttpStatus.NO_CONTENT).json({ data }))
        .catch(err => next(err));
}

/**
 * Delete a okupasi.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export function deleteOkupasi(req, res, next) {
    asuransiService
        .deleteOkupasi(req.params.id)
        .then(data => res.status(HttpStatus.NO_CONTENT).json({ data }))
        .catch(err => next(err));
}
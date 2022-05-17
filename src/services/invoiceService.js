import Boom from '@hapi/boom';

import Invoice from '../models/invoice';
import RatePremi from '../models/ratePremi';

/**
 * Query for invoice.
 * 
 * @param {Object} filter - Mongo filter.
 * @param {Object} options - Query options.
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc).
 * @param {number} [options.limit] - Maximum number of results per page (default = 10).
 * @param {number} [options.page] - Current page (default = 1).
 * @returns {Promise<QueryResult>}
 */
export const getAllInvoice = async (filter, options) => {
    const invoice = await Invoice.paginate(filter, options);

    return invoice;
};

/**
 * Get all Rate Premi.
 * 
 * @returns {Promise<QueryResult>}
 */
export const getAllRatePremi = async () => {
    const ratePremi = await RatePremi.find();

    if (ratePremi.length === 0) throw Boom.notFound('Rate premi not found');

    return ratePremi;
};

/**
* Get a invoice.
*
* @param   {Number|String}  id
* @returns {Promise}
*/
export async function getInvoice(id) {
    const invoice = await Invoice.findById(id);

    if (!invoice) {
        throw Boom.notFound('Invoice tidak ditemukan.');
    }

    return invoice;
}

/**
* Get last invoice.
*
* @returns {Promise}
*/
export async function getLastInvoice() {
    const invoice = await Invoice.findOne().sort({ createdAt: -1 });

    if (!invoice) {
        throw Boom.notFound('Invoice tidak ditemukan.');
    }

    return invoice;
}

/**
* Get a Rate Premi.
*
* @param   {Number|String}  id
* @returns {Promise}
*/
export async function getRatePremi(id) {
    const ratePremi = await RatePremi.findById(id);

    if (!ratePremi) {
        throw Boom.notFound('Rate Premi tidak ditemukan.');
    }

    return ratePremi;
}

/**
* Create new invoice.
*
* @param   {Object}  invoice
* @returns {Promise}
*/
export function createInvoice(invoice) {

    return Invoice.create(invoice);
}

/**
* Create new Rate Premi.
*
* @param   {Object}  ratePremi
* @returns {Promise}
*/
export function createRatePremi(ratePremi) {

    return RatePremi.create(ratePremi);
}

/**
* Update a invoice.
*
* @param   {Number|String}  id
* @param   {Object}         data
* @returns {Promise}
*/
export async function updateInvoice(id, data) {
    const invoice = await getInvoice(id);

    if (!invoice) {
        throw Boom.notFound('Invoice tidak ditemukan.');
    }

    Object.assign(invoice, data);

    await invoice.save();

    return invoice;
}

/**
* Update a Rate Premi.
*
* @param   {Number|String}  id
* @param   {Object}         data
* @returns {Promise}
*/
export async function updateRatePremi(id, data) {
    const ratePremi = await getRatePremi(id);

    if (!ratePremi) {
        throw Boom.notFound('RatePremi tidak ditemukan.');
    }

    Object.assign(ratePremi, data);

    await ratePremi.save();

    return ratePremi;
}

/**
* Delete a invoice.
*
* @param   {Number|String}  id
* @returns {Promise}
*/
export async function deleteInvoice(id) {
    const invoice = await getInvoice(id);

    if (!invoice) {
        throw Boom.notFound('Invoice tidak ditemukan.');
    }

    await invoice.remove();

    return invoice;

}

/**
* Delete a Rate Premi.
*
* @param   {Number|String}  id
* @returns {Promise}
*/
export async function deleteRatePremi(id) {
    const ratePremi = await getRatePremi(id);

    if (!ratePremi) {
        throw Boom.notFound('RatePremi tidak ditemukan.');
    }

    await ratePremi.remove();

    return ratePremi;

}
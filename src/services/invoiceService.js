import Boom from '@hapi/boom';

import Invoice from '../models/invoice';

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
* Create new invoice.
*
* @param   {Object}  invoice
* @returns {Promise}
*/
export function createInvoice(invoice) {

    return Invoice.create(invoice);
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
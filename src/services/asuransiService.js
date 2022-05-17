import Boom from '@hapi/boom';

import AsuransiKebakaran from '../models/asuransi-kebakaran';
import Okupasi from '../models/okupasi';

/**
 * Get All okupasi.
 * 
 * @returns {Promise<QueryResult>}
 */
export const getAllOkupasi = async () => {
    const okupasi = await Okupasi.find();
    // results,
    // page,
    // limit,
    // totalPages,
    // totalResults,

    return { results: okupasi };
};

/**
 * Query for asuransi.
 * 
 * @param {Object} filter - Mongo filter.
 * @param {Object} options - Query options.
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc).
 * @param {number} [options.limit] - Maximum number of results per page (default = 10).
 * @param {number} [options.page] - Current page (default = 1).
 * @returns {Promise<QueryResult>}
 */
export const getAllAsuransi = async (filter, options) => {
    const asuransi = await AsuransiKebakaran.paginate(filter, options);

    return asuransi;
};

/**
* Get a asuransi.
*
* @param   {Number|String}  id
* @returns {Promise}
*/
export async function getAsuransi(id) {
    const asuransi = await AsuransiKebakaran.findById(id);

    if (!asuransi) {
        throw Boom.notFound('Asuransi tidak ditemukan.');
    }

    return asuransi;
}

/**
* Get last invoice.
*
* @returns {Promise}
*/
export async function getLastInvoice() {
    const invoice = await AsuransiKebakaran.findOne().sort({ createdAt: -1 });

    if (!invoice) {
        throw Boom.notFound('Invoice tidak ditemukan.');
    }

    return invoice;
}

/**
* Get a okupasi.
*
* @param   {Number|String}  id
* @returns {Promise}
*/
export async function getOkupasi(id) {
    const okupasi = await Okupasi.findById(id);

    if (!okupasi) {
        throw Boom.notFound('Okupasi tidak ditemukan.');
    }

    return okupasi;
}

/**
 * Create new asuransi.
 *
 * @param   {Object}  asuransiData
 * @returns {Promise}
 */
export function createAsuransi(asuransiData) {

    return AsuransiKebakaran.create(asuransiData);
}

/**
 * Create new okupasi.
 *
 * @param   {Object}  okupasiData
 * @returns {Promise}
 */
export function createOkupasi(okupasiData) {

    return Okupasi.create(okupasiData);
}

/**
 * Update a asuransi.
 *
 * @param   {Number|String}  id
 * @param   {Object}         data
 * @returns {Promise}
 */
export async function updateAsuransi(id, data) {
    const asuransi = await getAsuransi(id);

    if (!asuransi) {
        throw Boom.notFound('Asuransi tidak ditemukan.');
    }

    Object.assign(asuransi, data);

    await asuransi.save();

    return asuransi;
}

/**
 * Update a okupasi.
 *
 * @param   {Number|String}  id
 * @param   {Object}         data
 * @returns {Promise}
 */
export async function updateOkupasi(id, data) {
    const okupasi = await getOkupasi(id);

    if (!okupasi) {
        throw Boom.notFound('Okupasi tidak ditemukan.');
    }

    Object.assign(okupasi, data);

    await okupasi.save();

    return okupasi;
}

/**
 * Delete a asuransi.
 *
 * @param   {Number|String}  id
 * @returns {Promise}
 */
export async function deleteAsuransi(id) {
    const asuransi = await getAsuransi(id);

    if (!asuransi) {
        throw Boom.notFound('Asuransi tidak ditemukan.');
    }

    await asuransi.remove();

    return asuransi;

}

/**
 * Delete a okupasi.
 *
 * @param   {Number|String}  id
 * @returns {Promise}
 */
export async function deleteOkupasi(id) {
    const okupasi = await getOkupasi(id);

    if (!okupasi) {
        throw Boom.notFound('Okupasi tidak ditemukan.');
    }

    await okupasi.remove();

    return okupasi;

}
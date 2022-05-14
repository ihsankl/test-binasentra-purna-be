import Boom from '@hapi/boom';

import AsuransiKebakaran from '../models/asuransi-kebakaran';

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
 * Create new asuransi.
 *
 * @param   {Object}  asuransiData
 * @returns {Promise}
 */
export function createAsuransi(asuransiData) {

    return AsuransiKebakaran.create(asuransiData);
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
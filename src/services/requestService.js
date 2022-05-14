import Boom from '@hapi/boom';

import Request from '../models/request';

/**
 * Query for request.
 * 
 * @param {Object} filter - Mongo filter.
 * @param {Object} options - Query options.
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc).
 * @param {number} [options.limit] - Maximum number of results per page (default = 10).
 * @param {number} [options.page] - Current page (default = 1).
 * @returns {Promise<QueryResult>}
 */
export const getAllRequest = async (filter, options) => {
    const request = await Request.paginate(filter, options);

    return request;
};

/**
* Get a request.
*
* @param   {Number|String}  id
* @returns {Promise}
*/
export async function getRequest(id) {
    const request = await Request.findById(id);

    if (!request) {
        throw Boom.notFound('Request tidak ditemukan.');
    }

    return request;
}

/**
* Create new request.
*
* @param   {Object}  request
* @returns {Promise}
*/
export function createRequest(request) {

    return Request.create(request);
}

/**
* Update a request.
*
* @param   {Number|String}  id
* @param   {Object}         data
* @returns {Promise}
*/
export async function updateRequest(id, data) {
    const request = await getRequest(id);

    if (!request) {
        throw Boom.notFound('Request tidak ditemukan.');
    }
    Object.assign(request, data);

    await request.save();

    return request;
}

/**
 * Delete a request.
 *
 * @param   {Number|String}  id
 * @returns {Promise}
 */
export async function deleteRequest(id) {
    const request = await getRequest(id);

    if (!request) {
        throw Boom.notFound('Request tidak ditemukan.');
    }

    await request.remove();

    return request;

}

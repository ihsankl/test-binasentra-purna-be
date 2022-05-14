import Boom from '@hapi/boom';

import User from '../models/user';

/**
 * Query for users.
 * 
 * @param {Object} filter - Mongo filter.
 * @param {Object} options - Query options.
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc).
 * @param {number} [options.limit] - Maximum number of results per page (default = 10).
 * @param {number} [options.page] - Current page (default = 1).
 * @returns {Promise<QueryResult>}
 */
export const getAllUsers = async (filter, options) => {
  const users = await User.paginate(filter, options);

  return users;
};

/**
 * Get a user.
 *
 * @param   {Number|String}  id
 * @returns {Promise}
 */
export function getUser(id) {
  return User.findById(id);
}

/**
 * Create new user.
 *
 * @param   {Object}  user
 * @returns {Promise}
 */
export async function createUser(user) {
  if (await User.isEmailTaken(user.email)) {
    throw Boom.badRequest('Email already taken.');
  }

  return User.create(user);
}

/**
 * Update a user.
 *
 * @param   {Number|String}  id
 * @param   {Object}         data
 * @returns {Promise}
 */
export async function updateUser(id, data) {
  const user = await getUser(id);

  if (!user) {
    throw Boom.notFound('User not found.');
  }
  if (data.email && (await User.isEmailTaken(data.email, id))) {
    throw Boom.badRequest('Email already taken.');
  }
  Object.assign(user, data);

  await user.save();

  return user;
}

/**
 * Delete a user.
 *
 * @param   {Number|String}  id
 * @returns {Promise}
 */
export async function deleteUser(id) {
  const user = await getUser(id);

  if (!user) {
    throw Boom.notFound('User not found.');
  }

  await user.remove();

  return user;

}

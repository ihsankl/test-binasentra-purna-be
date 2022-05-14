const allRoles = {
    user: ['createAsuransi', 'createInvoice', 'createRequest'],
    admin: ['getUsers', 'manageUsers', 'manageInvoice', 'manageAsuransi', 'manageRequest'],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

export { roles, roleRights };
const allRoles = {
    user: [
        'createAsuransi',
        'createInvoice',
        'createRequest',
        'editUser',
    ],
    admin: [
        'manageRatePremi',
        'manageOkupasi',
        'manageUsers',
        'editUser',
        'manageInvoice',
        'manageAsuransi',
        'manageRequest',
        'createAsuransi',
        'updateAsuransi',
        'deleteAsuransi',
        'createInvoice',
        'updateInvoice',
        'deleteInvoice',
        'createRequest',
        'updateRequest',
        'deleteRequest',
    ],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

export { roles, roleRights };
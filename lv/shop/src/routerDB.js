import React from 'react';

import wrapAdminAdd from './components/wrapAdminAdd';
import AdminUser from './components/AdminUser';


const routesDB = [
    {
        path: '/quanly/dashboard/',
        exact: true,
        main: () => <wrapAdminAdd />
    },
    {
        path: '/quanly/dashboard/user',
        exact: true,
        main: () => <AdminUser />
    },
   
];

export default routesDB;
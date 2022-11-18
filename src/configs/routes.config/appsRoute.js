import React from 'react'
import { APP_PREFIX_PATH } from 'constants/route.constant'
import { ADMIN, USER } from 'constants/roles.constant'

const appsRoute = [
  {
    key: "appsSales.dashboard",
    path: `${APP_PREFIX_PATH}/sales/dashboard`,
    component: React.lazy(() => import("views/sales/SalesDashboard")),
    authority: [ADMIN, USER],
  },
];

export default appsRoute
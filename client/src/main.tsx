import * as ReactDOM from 'react-dom/client';

import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import React, { Suspense } from 'react';
import { DeviceTypeProvider } from './Context/DeviceType/DeviceType';

const router = createBrowserRouter([
  {
    path: '/',
    Component: React.lazy(() => import('./app/layout')),
    children: [
      {
        path: 'dashboard/crm',
        Component: React.lazy(() => import('./app/Routes/Dashboard/CRM')),
      },
      {
        path: '*',
        Component: React.lazy(() => import('./app/Routes/NotFound')),
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Suspense fallback={<div>Loading...</div>}>
    <DeviceTypeProvider>
      <App />
    </DeviceTypeProvider>
  </Suspense>
);

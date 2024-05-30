import * as ReactDOM from 'react-dom/client';
import "./index.css"
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import React, { Suspense } from 'react';
import { DeviceTypeProvider } from './Context/DeviceType/DeviceType';
import Layout from './app/layout';


const router = createBrowserRouter([
  {
    path: '/',
    Component: Layout,
    children: [
      {
        path: '/dashboard/crm',
        Component: React.lazy(() => import('./app/Routes/Dashboard/CRM/CRM')),
      },{
        path: '/dashboard/analytics',
        Component: React.lazy(() => import('./app/Routes/Dashboard/Analytics/Analytics')),
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

import * as ReactDOM from 'react-dom/client';

import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Layout from './app/layout';
import CRM from './app/Routes/Dashboard/CRM';
import NotFound from './app/Routes/NotFound';

const router = createBrowserRouter([
  {
    path: '/',
    Component: Layout,
    children: [
      {
        path: 'dashboard/crm',
        Component: CRM,
      },
      {
        path: '*',
        Component: NotFound,
      },
    ],
  },
]);
function App() {
  return <RouterProvider router={router} />;
}
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(<App />);

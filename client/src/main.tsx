import * as ReactDOM from 'react-dom/client';

import {
  RouterProvider,
  createBrowserRouter
} from 'react-router-dom';
import Layout from './app/layout';
import CRM from './app/Routes/Dashboard/CRM';

const router = createBrowserRouter([
  {
    path: '/',
    Component: Layout,
    children: [
      {
        path: 'dashboard/CRM',
        Component: CRM,
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

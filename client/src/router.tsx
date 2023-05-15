import { RouteObject, createBrowserRouter } from 'react-router-dom';
import Home from '@/pages/Home';
import Layout from '@/layout';

const routes: RouteObject[] = [
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
    ],
  },
];

const MainRouter = createBrowserRouter(routes);

export default MainRouter;

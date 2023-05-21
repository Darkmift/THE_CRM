import { RouteObject, createBrowserRouter } from 'react-router-dom';
import Home from '@/pages/Home';
import Instructors from '@/pages/Instructors';
import Internships from '@/pages/Internships';
import Projects from '@/pages/Projects';
import WinningProjects from '@/pages/WinningProjects';
import Layout from '@/layout';
import DashboardPage from './pages/Dashboard';
import ProjectAddPage from './pages/Dashboard/Project/ProjectAdd';
import ProjectEditPage from './pages/Dashboard/Project/ProjectEdit';
import ProjectDashboardPage from './pages/Dashboard/Project';

const routes: RouteObject[] = [
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: 'dashboard',
        element: <DashboardPage />,
        children: [
          {
            path: 'project',
            element: <ProjectDashboardPage />,
            children: [
              {
                path: 'project-add',
                element: <ProjectAddPage />,
              },
              {
                path: 'project-edit',
                element: <ProjectEditPage />,
              },
            ],
          },
        ],
      },
      {
        path: 'instructors',
        element: <Instructors />,
      },
      {
        path: 'internships',
        element: <Internships />,
      },
      {
        path: 'projects',
        element: <Projects />,
      },
      {
        path: 'winning-projects',
        element: <WinningProjects />,
      },
    ],
  },
];

const MainRouter = createBrowserRouter(routes);

export default MainRouter;

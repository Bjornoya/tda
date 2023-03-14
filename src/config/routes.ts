import { PathRouteProps } from 'react-router-dom';
import HomePage from '../pages/home/home.page';
import DashboardPage from '../pages/dashboard/dashboard.page';
import NotfoundPage from '../pages/notfound/notfound.page';

interface IRoute extends PathRouteProps {
  name: string;
  protected: boolean;
  Component: any;
}

const ROUTES: IRoute[] = [
  {
    path: '/',
    name: 'Home Page',
    protected: false,
    Component: HomePage,
  },
  {
    path: '/dashboard/:tab/:page',
    name: 'Dashboard Page',
    protected: false, // make protected again after tests
    Component: DashboardPage,
  },
  {
    path: '*',
    name: 'NotFound',
    protected: false, // make protected again after tests
    Component: NotfoundPage,
  },
];

export default ROUTES;

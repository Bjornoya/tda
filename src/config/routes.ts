import { PathRouteProps } from 'react-router-dom';
import HomePage from '../pages/home/home.page';
import DashboardPage from '../pages/dashboard/dashboard.page';

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
    path: '/dashboard',
    name: 'Dashboard Page',
    protected: true,
    Component: DashboardPage,
  },
];

export default ROUTES;

import { PathRouteProps } from 'react-router-dom';
import HomePage from '../pages/home/home.page';
import DashboardPage from '../pages/dashboard/dashboard.page';

interface IRoute extends PathRouteProps {
  name: string;
  protected: boolean;
}

const ROUTES: IRoute[] = [
  {
    path: '/', name: 'Home Page', Component: HomePage, protected: false,
  },
  {
    path: '/dashboard', name: 'Dashboard Page', Component: DashboardPage, protected: true,
  },
];

export default ROUTES;

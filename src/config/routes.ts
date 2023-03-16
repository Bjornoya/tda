import { PathRouteProps } from 'react-router-dom';
import HomePage from '../pages/home/home.page';
import DashboardPage from '../pages/dashboard/dashboard.page';
import NotfoundPage from '../pages/notfound/notfound.page';
import GamePage from '../pages/game/game.page';

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
    path: '/game/:gameId/',
    name: 'Game Page',
    protected: false, // make protected again after tests
    Component: GamePage,
  },
  {
    path: '*',
    name: 'NotFound',
    protected: false, // make protected again after tests
    Component: NotfoundPage,
  },
];

export default ROUTES;

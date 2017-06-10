import Home from './pages/Home/Home';
import Path from './pages/Path/Path';
import Lesson from './pages/Lesson/Lesson';
import Profile from './pages/Profile/Profile';
import Times from './pages/Times/Times';
import Objectives from './pages/Objectives/Objectives';
import CourseCatalog from './pages/CourseCatalog/CourseCatalog';
import Dashboard from './pages/Dashboard/Dashboard';

/**
 * Client route definitions
 *
 * - path:      Path to the directory containing the component
 * - exact:     If true, only exact routes are matched.
 *              ("/" would match EVERY route without it for example)
 * - component: Component name. For example 'Home' for the 'Home.jsx' component.
 * - passdown:  Array of property names to be passed to the component.
 *              (Those names are defined in /server/reactRoutes.jsx)
 * - reqAuth:   If set, that route can only be accessed
 *              when authenticated, otherwise it redirects to "/".
 */
const routes = [
  {
    path: '/',
    exact: true,
    component: Home,
  },
  {
    path: '/paths/:id',
    exact: true,
    component: Path,
    passdown: ['curriculum'],
  },
  {
    path: '/lessons/:id',
    exact: true,
    component: Lesson,
    passdown: ['curriculum'],
  },
  {
    path: '/dashboard',
    exact: true,
    component: Dashboard,
    passdown: ['dispatch', 'user', 'curriculum', 'uiState'],
  },
  {
    path: '/courses',
    exact: true,
    component: CourseCatalog,
    passdown: ['curriculum'],
  },
  {
    path: '/profile',
    exact: true,
    component: Profile,
    passdown: ['user'],
    reqAuth: true,
  },
  {
    path: '/times',
    exact: true,
    component: Times,
  },
  {
    path: '/objectives',
    exact: true,
    component: Objectives,
  },
];

export default routes;

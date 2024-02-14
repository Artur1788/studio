import { createBrowserRouter } from 'react-router-dom';

import Root from './routes/Root';
import Home from './routes/Home';

export const router = createBrowserRouter([
  {
    path: '/:processId?',
    element: <Root />,
    children: [{ index: true, element: <Home /> }],
  },
]);

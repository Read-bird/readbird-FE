import { Loadable } from '@components/common/Loadable';
import { AppTemplate } from '@components/templates/AppTemplate';
import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';

// lazy 적용(코드스플리팅)
const AppHome = Loadable(
  lazy(() => import('@pages/AppHome').then((data) => ({ default: data.AppHome })))
);
const AppWeek = Loadable(
  lazy(() => import('@pages/AppWeek').then((data) => ({ default: data.AppWeek })))
);
const AppMonth = Loadable(
  lazy(() => import('@pages/AppMonth').then((data) => ({ default: data.AppMonth })))
);
const AppNotFound = Loadable(
  lazy(() => import('@pages/AppNotFound').then((data) => ({ default: data.AppNotFound })))
);

export const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <AppTemplate />,
    errorElement: <AppNotFound />,
    children: [
      {
        path: '',
        element: <AppHome />,
        errorElement: <AppNotFound />,
        children: [
          {
            path: '',
            element: <AppWeek />,
            errorElement: <AppNotFound />
          },
          {
            path: 'calendar',
            element: <AppMonth />,
            errorElement: <AppNotFound />
          }
        ]
      },

      {
        path: 'search',
        element: <div>검색</div>,
        errorElement: <AppNotFound />
      },
      {
        path: 'mypage',
        element: <div>마이페이지</div>,
        errorElement: <AppNotFound />
      }
    ]
  }
]);

import { Loadable } from '@components/common/Loadable';
import { ProtectedLogin } from '@components/common/ProtectedLogin';
import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import {AppMyPage} from "@pages/AppMyPage";
import {MyLibrary} from "@pages/MyPage/MyLibrary";
import {MyEncyclopedia} from "@pages/MyPage/MyEncyclopedia";

// lazy 적용(코드스플리팅)
const AppRoot = Loadable(
  lazy(() => import('@pages/AppRoot').then((data) => ({ default: data.AppRoot })))
);
const AppHome = Loadable(
  lazy(() => import('@pages/AppHome').then((data) => ({ default: data.AppHome })))
);
const AppWeek = Loadable(
  lazy(() => import('@pages/AppWeek').then((data) => ({ default: data.AppWeek })))
);
const AppMonth = Loadable(
  lazy(() => import('@pages/AppMonth').then((data) => ({ default: data.AppMonth })))
);
const AppLogin = Loadable(
  lazy(() => import('@pages/AppLogin').then((data) => ({ default: data.AppLogin })))
);
const AppKakaoCallback = Loadable(
  lazy(() => import('@pages/KakaoCallback').then((data) => ({ default: data.KakaoCallback })))
);
const AppNotFound = Loadable(
  lazy(() => import('@pages/AppNotFound').then((data) => ({ default: data.AppNotFound })))
);

export const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <ProtectedLogin appNode={<AppRoot />} />,
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
        element: <AppMyPage />,
        errorElement: <AppNotFound />,
      },
      {
        path: 'mypage/library',
        element: <MyLibrary />,
        errorElement: <AppNotFound />,
      },
      {
        path: 'mypage/encyclopedia',
        element: <MyEncyclopedia />,
        errorElement: <AppNotFound />,
      }
    ]
  },
  {
    path: '/login',
    element: <ProtectedLogin loginNode={<AppLogin />} />,
    errorElement: <AppNotFound />
  },
  {
    path: '/login/auth',
    element: <AppKakaoCallback />,
    errorElement: <AppNotFound />
  }
]);

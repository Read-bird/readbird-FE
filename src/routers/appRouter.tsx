import { Loadable } from '@components/common/Loadable';
import { ProtectedLogin } from '@components/common/ProtectedLogin';
import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import {AppMyPage} from "@pages/AppMyPage";
import {MyLibrary} from "@pages/MyPage/MyLibrary";
import {MyEncyclopedia} from "@pages/MyPage/MyEncyclopedia";
import {MyRestore} from "@pages/MyPage/MyRestore";

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
const AppSearch = Loadable(
  lazy(() => import('@pages/AppSearch').then((data) => ({ default: data.AppSearch })))
);
const AppSearchMain = Loadable(
  lazy(() => import('@pages/AppSearchMain').then((data) => ({ default: data.AppSearchMain })))
);
const AppSearchResult = Loadable(
  lazy(() => import('@pages/AppSearchResult').then((data) => ({ default: data.AppSearchResult })))
);
const AppNotFound = Loadable(
  lazy(() => import('@pages/AppNotFound').then((data) => ({ default: data.AppNotFound })))
);
const AppError = Loadable(
  lazy(() => import('@pages/AppError').then((data) => ({ default: data.AppError })))
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
            errorElement: <AppError />
          },
          {
            path: 'calendar',
            element: <AppMonth />,
            errorElement: <AppError />
          }
        ]
      },
      {
        path: 'search',
        element: <AppSearch />,
        errorElement: <AppNotFound />,
        children: [
          {
            path: '',
            element: <AppSearchMain />,
            errorElement: <AppError />
          },
          {
            path: 'result',
            element: <AppSearchResult />,
            errorElement: <AppError />
          }
        ]
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
      },
      {
        path: 'mypage/restore',
        element: <MyRestore />,
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

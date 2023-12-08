import { Loadable } from '@components/common/Loadable';
import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';

// lazy 적용(코드스플리팅)
const AppHome = Loadable(
	lazy(() => import('@pages/AppHome').then((data) => ({ default: data.AppHome })))
);
const AppNotFound = Loadable(
	lazy(() => import('@pages/AppNotFound').then((data) => ({ default: data.AppNotFound })))
);

export const appRouter = createBrowserRouter([
	{
		path: '/',
		element: <AppHome />,
		errorElement: <AppNotFound />
	}
]);

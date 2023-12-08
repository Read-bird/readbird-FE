import { LazyExoticComponent, Suspense } from 'react';

export const Loadable =
	(
		Component: LazyExoticComponent<() => JSX.Element>,
		fallback: JSX.Element = <div>로딩중...</div>
	) =>
	() => (
		<Suspense fallback={fallback}>
			<Component />
		</Suspense>
	);

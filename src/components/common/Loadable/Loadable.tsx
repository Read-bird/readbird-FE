import { LoadingTemplate } from '@components/templates/LoadingTemplate';
import { LazyExoticComponent, Suspense } from 'react';

export const Loadable =
  (
    Component: LazyExoticComponent<() => JSX.Element>,
    fallback: JSX.Element = <LoadingTemplate />
  ) =>
  () => (
    <Suspense fallback={fallback}>
      <Component />
    </Suspense>
  );

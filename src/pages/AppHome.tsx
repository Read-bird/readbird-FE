import { ErrorBoundary } from '@components/common/ErrorBoundary';
import { MyInfo } from '@components/connections';
import { HomeTemplate } from '@components/templates/HomeTemplate';

export const AppHome = () => {
  return (
    <ErrorBoundary>
      <MyInfo />
      <HomeTemplate />
    </ErrorBoundary>
  );
};

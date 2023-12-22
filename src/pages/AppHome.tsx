import { ErrorBoundary } from '@components/common/ErrorBoundary';
import { HomeTemplate } from '@components/templates/HomeTemplate';

export const AppHome = () => {
  return (
    <ErrorBoundary>
      <HomeTemplate />
    </ErrorBoundary>
  );
};

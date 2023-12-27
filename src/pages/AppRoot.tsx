import { MyInfo } from '@components/connections';
import { AppTemplate } from '@components/templates/AppTemplate';
import { Fragment } from 'react';
export const AppRoot = () => {
  return (
    <Fragment>
      <MyInfo />
      <AppTemplate />
    </Fragment>
  );
};

import { CheckDay, CheckModal, MyInfo } from '@components/connections';
import { AppTemplate } from '@components/templates/AppTemplate';
import { Fragment } from 'react';
export const AppRoot = () => {
  return (
    <Fragment>
      <CheckDay />
      <MyInfo />
      <CheckModal />
      <AppTemplate />
    </Fragment>
  );
};

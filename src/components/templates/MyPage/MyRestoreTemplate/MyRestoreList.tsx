import { axiosFetch } from '@api/axios';
import { TResponseMyRestore } from '@api/types';
import { Alert } from '@utils/Alert';
import { convertError } from '@utils/errors';
import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

export const MyRestoreList = () => {
  const [restoreList, setRestoreList] = useState<TResponseMyRestore[]>([]);

  const getRestoreList = async () => {
    try {
      const res = await axiosFetch({
        url: '/api/user/plan/delete',
        method: 'get'
      });

      if (res.status === 200) {
        console.log(res.data);
        setRestoreList(res?.data);
      }
    } catch (err) {
      if (err instanceof AxiosError) {
        Alert.error({ title: convertError(err.response?.data.messgae) });
      }
    }
  };

  useEffect(() => {
    getRestoreList();
  }, []);

  return (
    <StyledUl>
      <ul>
        {restoreList.map((plan) => (
          <li key={plan.planId}>
            {/*<Plan*/}
            {/*    coverImage={plan["Book.coverImage"]}*/}
            {/*    title={plan["Book.title"]}*/}
            {/*    target={plan["Book.target"]}*/}
            {/*    totalPage={plan["Book.totalPage"]}*/}
            {/*    currentPage={plan["Book.currentPage"]}*/}
            {/*    planId={plan["Book.coverImage"]}*/}
            {/*    endDate={plan["Book.coverImage"]}*/}
            {/*    recordStatus={plan["Book.coverImage"]}*/}
            {/*/>*/}
          </li>
        ))}
      </ul>
    </StyledUl>
  );
};

const StyledUl = styled.div`
  margin-top: 36px;
  width: 100%;
  display: flex;
  justify-content: center;
  ul {
    flex: 1;
    width: 100%;
    max-width: 364px;
    //overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
`;

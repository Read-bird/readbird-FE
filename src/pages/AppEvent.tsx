import { setOpen, setOpenType, setSelectCollections } from '@/store/reducers';
import { axiosFetch } from '@api/axios';
import { TResponseCollection } from '@api/types';
import { Alert } from '@utils/Alert';
import { convertError } from '@utils/errors';
import { AxiosError } from 'axios';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

export const AppEvent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const callEvent = async () => {
    try {
      const response = await axiosFetch<any, TResponseCollection[]>({
        url: '/api/collection/event',
        method: 'get'
      });

      if (response.status === 200) {
        dispatch(
          setSelectCollections(
            response.data.map((data) => ({
              ...data,
              title: `축하해요! ${data.name}를 획득하셨어요!`
            }))
          )
        );
        dispatch(setOpen(true));
        dispatch(setOpenType('character'));
      }
    } catch (e) {
      if (e instanceof AxiosError) {
        Alert.error({ title: convertError(e.response?.data.message) });
      }
    } finally {
      navigate('/mypage');
    }
  };

  useEffect(() => {
    callEvent();
  }, []);

  return <Wrap>이벤트 참여중...</Wrap>;
};

const Wrap = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: white;
  z-index: 20;

  display: flex;
  justify-content: center;
  align-items: center;
`;

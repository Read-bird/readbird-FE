import { axiosFetch } from '@api/axios';
import { TRegisterFormValue, TResponseMyRestore } from '@api/types';
import { Spacing } from '@components/common/Spacing';
import { RestoreBook } from '@components/templates/MyPage/MyRestoreTemplate/RestoreBook';
import { PlanModalTemplate } from '@components/templates/PlanModalTemplate';
import { Alert } from '@utils/Alert';
import { convertError } from '@utils/errors';
import { AxiosError } from 'axios';
import dayjs from 'dayjs';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { FixedSizeList } from 'react-window';
import styled from 'styled-components';

export const MyRestoreList = () => {
  const [restoreList, setRestoreList] = useState<TResponseMyRestore[]>([]);
  const [isOpenModal, setIsOpenModal] = useState(false);

  const methods = useForm<TRegisterFormValue>({
    mode: 'onSubmit',
    defaultValues: {
      author: null,
      planId: null,
      bookId: null,
      currentPage: 1,
      startDate: dayjs().format('YYYY-MM-DD'),
      endDate: dayjs().add(1, 'days').format('YYYY-MM-DD'),
      publisher: null,
      searchData: {
        bookList: [],
        page: 1,
        totalPage: 1
      },
      title: null,
      totalPage: 1
    }
  });

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

  const listHeight = useMemo(() => {
    const scrollHeight = document.body.scrollHeight;
    const headerHeight = 95;
    const footerHeight = 70;
    const bodyHeight = 30;
    return scrollHeight - (headerHeight + footerHeight + bodyHeight);
  }, []);

  const handleOpenModal = useCallback(
    (restoreData: TResponseMyRestore) => {
      Alert.warning({ title: '준비중입니다.' });
      return;
      // methods.setValue('bookId', restoreData.bookId);
      // methods.setValue('author', restoreData.author);
      // methods.setValue('title', restoreData.title);
      // methods.setValue('endDate', restoreData.endDate);
      // methods.setValue('startDate', restoreData.startDate);
      // methods.setValue('totalPage', restoreData.totalPage);
      // setIsOpenModal(true);
    },
    [setIsOpenModal, methods]
  );

  const itemData = useMemo(
    () => ({
      list: restoreList,
      handleOpenModal
    }),
    [restoreList, handleOpenModal]
  );

  useEffect(() => {
    getRestoreList();
  }, []);

  return (
    <Wrap>
      <Spacing height={30} />
      {!!restoreList.length ? (
        <FixedSizeList
          height={listHeight}
          itemSize={105}
          width="100%"
          itemCount={restoreList.length}
          itemData={itemData}
        >
          {RestoreBook}
        </FixedSizeList>
      ) : (
        <Empty>삭제한 플랜이 없어요.</Empty>
      )}
      <FormProvider {...methods}>
        <PlanModalTemplate isOpen={isOpenModal} setIsOpen={setIsOpenModal} modalIndex={1} />
      </FormProvider>
    </Wrap>
  );
};

const Wrap = styled.div`
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 0 13px;
`;

const Empty = styled.p`
  width: 100%;
  text-align: center;
  line-height: 40px;
  font-size: 16px;
  font-weight: 500;
  color: #747474;
`;

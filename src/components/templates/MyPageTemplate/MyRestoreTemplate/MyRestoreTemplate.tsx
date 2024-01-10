import { axiosFetch } from '@api/axios';
import { TRegisterFormValue, TResponseMyRestore } from '@api/types';
import { Spacing } from '@components/common/Spacing';
import { RestoreBook } from '@components/templates/MyPageTemplate/MyRestoreTemplate/RestoreBook';
import { PlanModalTemplate } from '@components/templates/PlanModalTemplate';
import { usePlanValidation } from '@hooks/planValidation';
import { Alert } from '@utils/Alert';
import { convertError } from '@utils/errors';
import { AxiosError } from 'axios';
import dayjs from 'dayjs';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { FixedSizeList } from 'react-window';
import styled from 'styled-components';

export const MyRestoreTemplate = () => {
  const [restoreList, setRestoreList] = useState<TResponseMyRestore[]>([]);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const { planValidation } = usePlanValidation();

  // 플랜 복구에 대한 정보
  const methods = useForm<TRegisterFormValue>({
    mode: 'onSubmit',
    defaultValues: {
      searchData: {
        bookList: [],
        page: 1,
        totalPage: 1
      }
    }
  });

  const getRestoreList = async () => {
    try {
      const res = await axiosFetch({
        url: '/api/user/plan/delete',
        method: 'get'
      });

      if (res.status === 200) {
        setRestoreList(res?.data);
      }
    } catch (err) {
      if (err instanceof AxiosError) {
        Alert.error({ title: convertError(err.response?.data.messgae) });
      }
    }
  };

  const listHeight = useMemo(() => {
    const doc = document.querySelector('#root') as HTMLElement;
    const scrollHeight = doc.scrollHeight;
    const headerHeight = 85;
    const footerHeight = 70;
    const bodyHeight = 30;
    return scrollHeight - (headerHeight + footerHeight + bodyHeight);
  }, []);

  // 플랜 복구 시
  const handleOpenModal = useCallback(
    async (restoreData: TResponseMyRestore) => {
      const validation = await planValidation();
      if (!validation) return;

      methods.setValue('planId', restoreData.planId);
      methods.setValue('author', restoreData.author);
      methods.setValue('isbn', restoreData.isbn);
      methods.setValue('startDate', dayjs().format('YYYY-MM-DD'));
      methods.setValue('endDate', dayjs().format('YYYY-MM-DD'));
      methods.setValue('publisher', restoreData.publisher);
      methods.setValue('title', restoreData.title);
      methods.setValue('totalPage', restoreData.totalPage);
      methods.setValue('currentPage', restoreData.currentPage);
      methods.setValue('coverImage', restoreData.coverImage);
      methods.setValue('description', restoreData.description);
      setIsOpenModal(true);
    },
    [setIsOpenModal, methods, planValidation]
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
        <PlanModalTemplate
          isOpen={isOpenModal}
          setIsOpen={setIsOpenModal}
          modalIndex={1}
          isRestore={true}
        />
      </FormProvider>
    </Wrap>
  );
};

const Wrap = styled.div`
  width: 100%;
  height: 100%;
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

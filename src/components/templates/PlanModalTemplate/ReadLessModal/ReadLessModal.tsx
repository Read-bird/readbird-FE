import { addPlanList, clearFailedPlan, deletePlanData } from '@/store/reducers';
import { TRootState } from '@/store/state';
import { axiosFetch } from '@api/axios';
import { TPlan } from '@api/types';
import { Images } from '@assets/images';
import { ReactSlider } from '@components/common/Slider';
import { Spacing } from '@components/common/Spacing';
import { SelectLabel } from '@components/templates/PlanModalTemplate/SelectLabel';
import { Alert } from '@utils/Alert';
import { lastDayMonth } from '@utils/calendar';
import { convertError } from '@utils/errors';
import { AxiosError } from 'axios';
import dayjs from 'dayjs';
import { Fragment, useCallback, useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { CheckBox } from './CheckBox';
import { BookTitle, ButtonWrap, FormWrap, GuideSpan, TextSpan } from './Styled';

type TProps = {
  handleClose: () => void;
};

type TRequestData = {
  checked: boolean;
  planId: number;
  endDate: string;
};

type TResponseData = TPlan & {
  message?: string;
};

export type TFormValue = {
  requestData: TRequestData[];
};

// 실패 후 연장모달
export const ReadLessModal = ({ handleClose }: TProps) => {
  const dispatch = useDispatch();
  const { previouslyFailedPlan } = useSelector((state: TRootState) => state.planStore);

  const methods = useForm<TFormValue>({
    mode: 'onSubmit',
    defaultValues: {
      requestData: []
    }
  });

  const reqeustData = methods.watch('requestData');

  // 날짜 리스트 생성
  const options = (...args: number[]) => {
    const array: string[] = [];
    const start = args[0];
    const size = args[1];

    for (let i = start; i <= size; i++) {
      array.push(`${i}`);
    }

    return array;
  };

  // 날짜 리스트 생성
  const generateDate = useCallback((type: 'Y' | 'M' | 'D', date: string) => {
    const compDate = new Date(date);
    const nowDate = new Date();

    const month = compDate.getMonth() + 1;
    if (type === 'Y') {
      return [nowDate.getFullYear(), nowDate.getFullYear() + 10];
    }

    if (type === 'M') {
      return [1, 12];
    }

    const lastMonth = lastDayMonth(compDate)[month];

    return [1, lastMonth];
  }, []);

  // 날짜 수정
  const handleChangeDate =
    (type: 'Y' | 'M' | 'D', planId: number, endDate: string) => (value: string) => {
      methods.clearErrors();
      const prev = methods.getValues();
      const date = new Date(endDate);

      if (type === 'Y') {
        date.setFullYear(Number(value));
      } else if (type === 'M') {
        date.setMonth(Number(value) - 1);
      } else {
        date.setDate(Number(value));
      }

      const changeData = prev.requestData.map((data) => {
        if (data.planId === planId) {
          return {
            ...data,
            endDate: dayjs(date).format('YYYY-MM-DD')
          };
        }
        return data;
      });

      methods.setValue('requestData', changeData);
    };

  // 연장 api 호출
  const onRequest = async ({ requestData }: TFormValue) => {
    try {
      const extendData = requestData
        .filter((data) => data.checked)
        .map((data) => ({ planId: data.planId, endDate: data.endDate }));

      const response = await axiosFetch<
        { extendData: Omit<TRequestData, 'checked'>[] },
        TResponseData[]
      >({
        url: '/api/plan/extend',
        method: 'post',
        options: {
          data: {
            extendData
          }
        }
      });

      if (response.status === 201) {
        // 실패했을때 alert 변경
        if (response.data.some((data) => !!data.message)) {
          Alert.warning({
            title: '일부 플랜 연장에 실패했어요!',
            action: () => {
              extendData.forEach((data) => {
                dispatch(deletePlanData(data.planId));
              });
              dispatch(addPlanList(response.data.filter((data) => !data.message)));
              dispatch(clearFailedPlan());
              handleClose();
            }
          });
        } else {
          Alert.success({
            title: '플랜을 연장했어요!',
            action: () => {
              extendData.forEach((data) => {
                dispatch(deletePlanData(data.planId));
              });
              dispatch(addPlanList(response.data));
              dispatch(clearFailedPlan());
              handleClose();
            }
          });
        }
      }
    } catch (e) {
      if (e instanceof AxiosError) {
        Alert.error({ title: convertError(e.response?.data.message) });
      }
    }
  };

  // 플랜연장하기
  const onSubmit = (props: TFormValue) => {
    const some = props.requestData.some(
      (data) => data.endDate < dayjs().format('YYYY-MM-DD') && data.checked
    );

    if (some) {
      methods.setError('requestData', {
        message: '* 종료일을 다시 설정해주세요.'
      });
      return;
    }

    if (props.requestData.every((data) => !data.checked)) {
      Alert.warning({
        title: '플랜연장을 체크한 항목이 없어요!'
      });
      return;
    }

    if (props.requestData.some((data) => !data.checked)) {
      Alert.confirm({
        title: '플랜연장에 체크하지 않은 항목이 있어요!',
        text: '도서정보 오른쪽 체크박스에 체크해주세요.',
        confirmButtonText: '이대로 할래요!',
        cancelButtonText: '다시 할게요',
        action: async (result) => {
          if (result.isConfirmed) {
            onRequest(props);
          }
        }
      });
    } else {
      onRequest(props);
    }
  };

  useEffect(() => {
    if (previouslyFailedPlan.length) {
      methods.setValue(
        'requestData',
        previouslyFailedPlan.map((plan) => ({
          checked: false,
          endDate: dayjs().format('YYYY-MM-DD'),
          planId: plan.planId
        }))
      );
    }
  }, [previouslyFailedPlan.length]);

  return (
    <FormProvider {...methods}>
      <FormWrap onSubmit={methods.handleSubmit(onSubmit)}>
        <ReactSlider width="100%" height="355px">
          {previouslyFailedPlan.map((plan, index) => (
            <Fragment key={plan.planId}>
              <Spacing height={20} />
              <h2>이런, 플랜 완주에 실패했어요</h2>
              <Spacing height={25} />
              <div className="book-wrap">
                <CheckBox index={index} />
                <Images
                  imgUrl={plan.coverImage ?? undefined}
                  imgAlt={plan.title}
                  imgWidth={77}
                  imgHeight={115}
                />
                <div className="book-info-wrap">
                  <div className="book-info">
                    <BookTitle>{plan.title}</BookTitle>
                    <Spacing height={5} />
                    <TextSpan>{plan.author}</TextSpan>
                    <Spacing height={5} />
                    <TextSpan>{plan.publisher}</TextSpan>
                  </div>
                  <TextSpan>총 {plan.totalPage.toLocaleString()}쪽</TextSpan>
                </div>
              </div>
              <Spacing height={25} />
              <h3>목표 기간을 연장하고 끝까지 읽어볼까요?</h3>
              <Spacing height={15} />
              <div className="cont select">
                <SelectLabel
                  id={'endDate-y'}
                  options={options(...generateDate('Y', reqeustData[index]?.endDate))}
                  handleChangeDate={handleChangeDate('Y', plan.planId, reqeustData[index]?.endDate)}
                  value={dayjs(reqeustData[index]?.endDate).format('YYYY')}
                />
                <span>년</span>
                <SelectLabel
                  id={'endDate-m'}
                  options={options(...generateDate('M', reqeustData[index]?.endDate))}
                  handleChangeDate={handleChangeDate('M', plan.planId, reqeustData[index]?.endDate)}
                  value={dayjs(reqeustData[index]?.endDate).format('M')}
                />
                <span>월</span>
                <SelectLabel
                  id={'endDate-d'}
                  options={options(...generateDate('D', reqeustData[index]?.endDate))}
                  handleChangeDate={handleChangeDate('D', plan.planId, reqeustData[index]?.endDate)}
                  value={dayjs(reqeustData[index]?.endDate).format('D')}
                />
                <span>일 까지</span>
              </div>
              <Spacing height={5} />
              <GuideSpan>{methods.formState.errors.requestData?.message}</GuideSpan>
              <Spacing height={10} />
            </Fragment>
          ))}
        </ReactSlider>
        <ButtonWrap>
          <button className="cancel active" type="button" onClick={handleClose}>
            포기할래요...
          </button>
          <button className="right active" type="submit">
            좋아요!
          </button>
        </ButtonWrap>
      </FormWrap>
    </FormProvider>
  );
};

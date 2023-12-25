import {Controller, SetValueConfig, useForm} from "react-hook-form";
import styled from "styled-components";
import {InputLabel} from "@components/common/Form/InputLabel";
import React, {Dispatch, SetStateAction, useEffect, useState} from "react";
import {SelectLabel} from "@components/common/Form/SelectLabel";
import dayjs from "dayjs";
import {authFetch} from "@api/axios";
import {useNavigate} from "react-router-dom";
import {Alert, go} from "@/utils";
import {IRegisterForm} from "@api/types/planRegister";
import {TBookDetail, TSearchBooks, TSearchBooksResult} from "@api/types/book";
import {SearchList} from "@components/common/Search";
import {useSelector} from "react-redux";
import {TRootState} from "@/store/state";
import {TPlan} from "@api/types";

type TProps = {
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    isEdit: boolean;
    planId?: number
}

export const RegisterModal = ({
                                  setIsOpen,
                                  isEdit,
                                  planId
                              }: TProps) => {
    const {
        register,
        control,
        handleSubmit: onSubmit,
        watch,
        setValue,
        formState: {errors},
    } = useForm<IRegisterForm>({
        mode: "onSubmit",
        defaultValues: {
            planId: null,
            title: "",
            author: null,
            publisher: null,
            totalPage: null,
            currentPage: "",
            startDate: "",
            endDate: ""
        },
    });

    const navigate = useNavigate();
    const { currentDate, planData, weedRecord } = useSelector((state: TRootState) => state.planStore);
    const [yearOptions, setYearOptions] = useState<number[]>([]);
    const [monthOptions, setMonthOptions] = useState<(number | string)[]>([]);
    const [dayOptions, setDatOptions] = useState<(number | string)[]>([]);
    const [startYear, setStartYear] = useState<string>(String(new Date().getFullYear()));
    const [endYear, setEndYear] = useState<string>(String(new Date().getFullYear()));
    const [startMonth, setStartMonth] = useState<string>('01');
    const [endMonth, setEndMonth] = useState<string>('01');
    const [startDay, setStartDay] = useState<string>('01');
    const [endDay, setEndDay] = useState<string>('01');
    const [bookList, setBookList] = useState<any>([]);
    const [isSearch, setIsSearch] = useState(false);
    const [selectBook, setSelectBook] = useState<TBookDetail>();
    const [searchPage, setSearchPage] = useState<number>(1);
    const [isScroll, setIsScroll] = useState(false);
    const [editPlanId, setEditPlanId] = useState<number>();

    useEffect(() => {
        const generateYearOptions = () => {
            const currentYear = dayjs().year();
            const yearOptions = [];
            for (let year = currentYear; year <= currentYear + 50; year++) {
                yearOptions.push(year);
            }
            setYearOptions(yearOptions);
        };

        const generateMonthOptions = () => {
            const monthOptions = [];
            for (let month = 1; month <= 12; month++) {
                monthOptions.push(month < 10 ? `0${month}` : month);
            }
            setMonthOptions(monthOptions);
        };

        const generateDayOptions = () => {
            const dayOptions = [];
            for (let day = 1; day <= 31; day++) {
                dayOptions.push(day < 10 ? `0${day}` : day);
            }
            setDatOptions(dayOptions);
        };

        generateYearOptions();
        generateMonthOptions();
        generateDayOptions();
    }, []);
    useEffect(() => {
        const startDateForm = startYear ? `${startYear}-${startMonth}-${startDay}` : "";
        const endDateForm = endYear ? `${endYear}-${endMonth}-${endDay}` : "";

        setValue("startDate", startDateForm);
        setValue("endDate", endDateForm);
    }, [
        startYear,
        endYear,
        startMonth,
        endMonth,
        startDay,
        endDay
    ]);
    useEffect(() => {
        if(isEdit){
            setIsSearch(false);
            return;
        }
        if(!selectBook && watch("title") !== ""){
            setIsSearch(true);
            searchBookInfo();
        }else if(selectBook && watch("title") !== ""){
            setIsSearch(false);
        }
    }, [watch("title")]);
    useEffect(() => {
        if(selectBook){
            setIsSearch(false);
            setValue("title", selectBook?.title);
            setValue("author", selectBook?.author);
            setValue("publisher", selectBook?.publisher);
            setValue("totalPage", selectBook?.totalPage);
        }
    }, [selectBook]);
    useEffect(() => {
        if(isScroll && watch("title") !== ""){
            searchBookInfo();
        }
    }, [searchPage]);
    useEffect(() => {
        if(isEdit){
            const editPlanInfo: TPlan | undefined = planData?.find(plan => plan.planId === planId);
            if(editPlanInfo){
                const [sY, sM, sD] = editPlanInfo?.startDate?.split('T')[0].split('-');
                const [eY, eM, eD] = editPlanInfo?.endDate.split('T')[0].split('-');
                setValue("title", editPlanInfo?.title);
                setValue("author", editPlanInfo?.author);
                setValue("publisher", editPlanInfo?.publisher);
                setValue("totalPage", editPlanInfo?.totalPage);
                setValue("currentPage", String(editPlanInfo?.currentPage));
                setEditPlanId(editPlanInfo?.planId);
                setStartYear(sY);
                setStartMonth(sM);
                setStartDay(sD);
                setEndYear(eY);
                setEndMonth(eM);
                setEndDay(eD);
            }
        }
    }, [isEdit]);

    const handleDateChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        let contId = event.target.id;
        switch (contId) {
            case "startDate-y":
                setStartYear(event.target.value);
                break;
            case "startDate-m":
                setStartMonth(event.target.value);
                break;
            case "startDate-d":
                setStartDay(event.target.value);
                break;
            case "endDate-y":
                setEndYear(event.target.value);
                break;
            case "endDate-m":
                setEndMonth(event.target.value);
                break;
            case "endDate-d":
                setEndDay(event.target.value);
                break;
            default:
                break;
        }
    };

    // 등록/수정
    const handleSubmit = async (data: IRegisterForm) => {
        try {
            const requestData = {
                planId: null,
                title: data?.title,
                author: data?.author,
                totalPage: data?.totalPage,
                currentPage: Number(data?.currentPage),
                publisher: data?.publisher,
                startDate: data?.startDate,
                endDate: data?.endDate,
            }
            const res = !isEdit ?
                await authFetch.post("/api/plan", requestData):
                await authFetch.put(`/api/plan/${editPlanId}`, {endDate : data?.endDate});
            if (!isEdit ? res.status === 201 : res.status === 200) {
                Alert.success({
                    title: '성공!',
                    text: !isEdit ? '플랜이 성공적으로 등록되었습니다.' : '플랜이 성공적으로 수정되었습니다.'
                });
                setIsOpen(false);
                navigate("/");
            }else{
                Alert.error({
                    title: 'Error',
                    text: !isEdit ? '플랜 등록에 실패했습니다.' : '플랜 수정에 실패했습니다.'
                });
            }
        } catch (err) {
            Alert.error({
                title: 'Error',
                text: !isEdit ? '플랜 등록에 실패했습니다.' : '플랜 수정에 실패했습니다.'
            });
        }
    };

    const handleClose = () => {
        setIsOpen(false);
    }

    const searchBookInfo = async () => {
        try{
            const requestData: TSearchBooks = {
                title: watch("title") || "",
                page: String(searchPage),
                scale: "10"
            }
            const res = await authFetch.get<TSearchBooksResult>(`/api/book${go(requestData)}`);
            if(res.status === 200){
                if(res?.data?.bookList?.length !== 0){
                    if(isScroll){
                        setBookList((prev: []) => [...prev, ...res?.data?.bookList]);
                    }else{
                        setBookList(res?.data?.bookList);
                    }
                }
            }
        }catch (err: any){
            Alert.error({
                title: `${err.message}`
            })
        }
    }

    return (
        <StyledForm onSubmit={onSubmit(handleSubmit)}>
            <InputLabel
                label={"책 이름"}
                type={"text"}
                id={"title"}
                placeholder={"데미안"}
                required={"제목을 입력해주세요."}
                name={"title"}
                register={register}
                errors={errors.title}
                defaultValue={selectBook && selectBook?.title}
                disabled={selectBook || isEdit}
            />
            {isSearch &&
                <SearchList
                    searchWord={watch("title")}
                    bookList={bookList}
                    setIsSearch={setIsSearch}
                    setSelectBook={setSelectBook}
                    setSearchPage={setSearchPage}
                    setIsScroll={setIsScroll}
                />
            }
            <div className="cont flex">
                <InputLabel
                    label={"글쓴이"}
                    type={"text"}
                    id={"author"}
                    placeholder={"헤르만 헤세"}
                    name={"author"}
                    register={register}
                    disabled={selectBook || isEdit}
                />
                <InputLabel
                    label={"출판사"}
                    type={"text"}
                    id={"publisher"}
                    placeholder={"민음사"}
                    name={"publisher"}
                    register={register}
                    disabled={selectBook || isEdit}
                />
            </div>
            <div className="cont flex">
                <InputLabel
                    label={"총 쪽 수"}
                    type={"text"}
                    id={"totalPage"}
                    placeholder={"240"}
                    name={"totalPage"}
                    register={register}
                    pattern={/^[0-9]*$/}
                    errors={errors.totalPage}
                    disabled={selectBook || isEdit}
                />
                <InputLabel
                    label={"시작하는 쪽"}
                    type={"text"}
                    id={"currentPage"}
                    placeholder={"120"}
                    name={"currentPage"}
                    register={register}
                    pattern={/^[0-9]*$/}
                    required={"시작 페이지를 입력해주세요."}
                    errors={errors.currentPage}
                />
            </div>
            <div className="cont">
                <label>목표 기간</label>
                <div className="cont select">
                    <SelectLabel
                        id={"startDate-y"}
                        placeholder={"2024"}
                        name={"startDate-y"}
                        options={yearOptions}
                        onChange={handleDateChange}
                        disabled={isEdit}
                        defaultValue={startYear}
                    /><span>년</span>
                    <SelectLabel
                        id={"startDate-m"}
                        placeholder={"01"}
                        name={"startDate-m"}
                        options={monthOptions}
                        onChange={handleDateChange}
                        disabled={isEdit}
                        defaultValue={startMonth}
                    /><span>월</span>
                    <SelectLabel
                        id={"startDate-d"}
                        placeholder={"01"}
                        name={"startDate-d"}
                        options={dayOptions}
                        onChange={handleDateChange}
                        disabled={isEdit}
                        defaultValue={startDay}
                    /><span>일 부터</span>
                </div>
                <div className="cont select">
                    <SelectLabel
                        id={"endDate-y"}
                        placeholder={"2024"}
                        name={"endDate-y"}
                        options={yearOptions}
                        onChange={handleDateChange}
                        defaultValue={endYear}
                    /><span>년</span>
                    <SelectLabel
                        id={"endDate-m"}
                        placeholder={"01"}
                        name={"endDate-m"}
                        options={monthOptions}
                        onChange={handleDateChange}
                        defaultValue={endMonth}
                    /><span>월</span>
                    <SelectLabel
                        id={"endDate-d"}
                        placeholder={"01"}
                        name={"endDate-d"}
                        options={dayOptions}
                        onChange={handleDateChange}
                        defaultValue={endDay}
                    /><span>일 까지</span>
                </div>
            </div>


            <div className="cont flex" style={{marginTop: "10px"}}>
                <button type="button" className="btn-1 btn" onClick={handleClose}>취소</button>
                <button type="submit" className="btn-2 btn" onClick={onSubmit(handleSubmit)}>{!isEdit ? "확인" : "수정"}</button>
            </div>
        </StyledForm>
    )
}

const StyledForm = styled.form`
  div.cont {
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-bottom: 17px;
    position: relative;

    &.flex {
      flex-direction: row;
      gap: 15px;
      margin-bottom: 0;
    }

    &.select {
      gap: 5px;
      flex-direction: row;
      align-items: center;

      span {
        color: #ABABAB;
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        line-height: 24px;
        letter-spacing: 0.16px;
      }
    }
  }

  label {
    color: #B780DB;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 24px;
    letter-spacing: 0.16px;
    margin-bottom: 8px;
    display: block;
  }

  input {
    display: block;
    width: 100%;
    border-radius: 10px;
    border: 1px solid #ABABAB;
    background: #FFF;
    font-size: 16px;
    font-weight: 500;
    padding: 8px 15px;
    &:invalid{
      border: 1px solid #f00;
    }

    &::placeholder {
      color: #CFCFCF
    }

    &[name="title"] {
      padding: 8px 35px 8px 15px;
    }
    
    &:disabled{
      background-color: #CFCFCF;
    }
  }

  .search-icon {
    position: absolute;
    right: 8px;
    top: 34px;
    cursor: pointer;

    svg {
      width: 22px;
    }
  }
  small[role="alert"]{
    font-size: 12px;
    color: #FF7C7C;
    font-style: normal;
    font-weight: 400;
    line-height: 16px;
    letter-spacing: 0.2px;
    
  }

  select {
    display: block;
    width: 100%;
    border-radius: 10px;
    border: 1px solid #ABABAB;
    background: #FFF;
    font-size: 16px;
    font-weight: 500;
    padding: 8px;

    &::placeholder {
      color: #CFCFCF
    }

    &:disabled{
      background-color: #CFCFCF;
    }

    &:nth-of-type(1) {
      width: 98px;
    }

    &:nth-of-type(2) {
      width: 60px;
    }

    &:nth-of-type(3) {
      width: 60px;
    }
  }

  .btn {
    border-radius: 10px;
    padding: 12px 0;
    width: 100%;
    color: #FFF;
    text-align: center;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    cursor: pointer;
  }

  .btn-1 {
    background: #CFCFCF;
  }

  .btn-2 {
    background: #B780DB;
  }
`

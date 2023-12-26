import { TBook } from '@/store/reducers';

export interface IRegisterForm {
  planId: number | null;
  title: string | null;
  author: string | null;
  publisher: string | null;
  totalPage: string | number | null;
  currentPage: string;
  startDate: string;
  endDate: string;
}

export type TRegisterFormValue = {
  planId: number | null;
  title: string | null;
  author: string | null;
  publisher: string | null;
  totalPage: number;
  currentPage: number;
  startDate: string;
  endDate: string;
  bookId: number | null;
  searchData: {
    bookList: TBook[];
    page: number;
    totalPage: number;
  };
};

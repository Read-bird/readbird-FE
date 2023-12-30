import { TBookDetail } from '@api/types/book';

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
  isbn: string | null;
  coverImage: string | null;
  searchData: {
    bookList: TBookDetail[];
    page: number;
    totalPage: number;
  };
};

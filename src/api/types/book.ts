// 도서 검색
export type TSearchBooks = {
  title: string;
  page: string;
  scale: string;
};

// 도서 검색 결과
export type TSearchBooksResult = {
  bookList: TBookDetail[];
  page: number;
  scale: number;
  totalPage: number;
};

// 도서 검색 결과 상세
export type TBookDetail = {
  title: string;
  author: string;
  pubDate: string;
  description: string;
  isbn: string;
  publisher: string;
  totalPage: number;
  coverImage: string;
};

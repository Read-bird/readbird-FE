// 도서 검색
export type TSearchBooks = {
    title: string;
    page: string;
    scale: string;
}

// 도서 검색 결과
export type TSearchBooksResult = {
    bookList: TBookDetail[] | any;
    page: number;
    scale: number;
    totalPage: number;
}

// 도서 검색 결과 상세
export type TBookDetail = {
    author: string
    bookId: number
    coverImage: string
    description: string
    isbn: string
    pubDate: string
    publisher: string
    title: string
    totalPage: number
}

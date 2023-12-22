import { TBookDetail, TSearchBooksResult } from '@api/types';

export type TBook = Omit<TBookDetail, 'totalPage'> & { totalPage: number };

export type TBookData = Omit<TSearchBooksResult, 'bookList'> & { bookList: TBook[] };

export const books: TBookData = {
  bookList: [
    {
      author: '저자명 저자명',
      bookId: 1,
      coverImage: '',
      description:
        'Lorem ipsum dolor sit amet consectetur. Ac purus ut cras quam. Volutpat aliquam semper sem in purus aliquam eget non. Lacus purus tellus quis euismod condimentum et. Sit condimentum in non sed est. In tellus faucibus pulvinar vestibulum risus sagittis ultrices at. Lorem ipsum dolor sit amet consectetur. Ac purus ut cras quam. Volutpat aliquam semper sem in purus aliquam eget non. Lacus purus tellus quis euismod condimentum et. Sit condimentum in non sed est. In tellus faucibus pulvinar vestibulum risus sagittis ultrices at.',
      isbn: '1231-1231-1231-1233',
      pubDate: '',
      publisher: '출판사명 출판사명 출판사명 출판사명 출판사명',
      title:
        '딸아, 외로울 때는 시를 읽으렴 - 지금 생의 가장 아름다운 시절을 보내고 있는 당신에게 주고 싶은 시 90편',
      totalPage: 200
    },
    {
      author: '저자명 저자명',
      bookId: 2,
      coverImage: '',
      description:
        'Lorem ipsum dolor sit amet consectetur. Ac purus ut cras quam. Volutpat aliquam semper sem in purus aliquam eget non. Lacus purus tellus quis euismod condimentum et. Sit condimentum in non sed est. In tellus faucibus pulvinar vestibulum risus sagittis ultrices at.',
      isbn: '1231-1231-1231-1233',
      pubDate: '',
      publisher: '출판사명 출판사명 출판사명',
      title: '도서명 도서명 도서명',
      totalPage: 200
    },
    {
      author: '저자명 저자명',
      bookId: 3,
      coverImage: '',
      description:
        'Lorem ipsum dolor sit amet consectetur. Ac purus ut cras quam. Volutpat aliquam semper sem in purus aliquam eget non. Lacus purus tellus quis euismod condimentum et. Sit condimentum in non sed est. In tellus faucibus pulvinar vestibulum risus sagittis ultrices at.',
      isbn: '1231-1231-1231-1233',
      pubDate: '',
      publisher: '출판사명 출판사명',
      title: '도서명 도서명 도서명',
      totalPage: 200
    },
    {
      author: '저자명 저자명',
      bookId: 4,
      coverImage: '',
      description:
        'Lorem ipsum dolor sit amet consectetur. Ac purus ut cras quam. Volutpat aliquam semper sem in purus aliquam eget non. Lacus purus tellus quis euismod condimentum et. Sit condimentum in non sed est. In tellus faucibus pulvinar vestibulum risus sagittis ultrices at.',
      isbn: '1231-1231-1231-1233',
      pubDate: '',
      publisher: '출판사명 출판사명',
      title: '도서명 도서명 도서명',
      totalPage: 200
    },
    {
      author: '저자명 저자명',
      bookId: 5,
      coverImage: '',
      description:
        'Lorem ipsum dolor sit amet consectetur. Ac purus ut cras quam. Volutpat aliquam semper sem in purus aliquam eget non. Lacus purus tellus quis euismod condimentum et. Sit condimentum in non sed est. In tellus faucibus pulvinar vestibulum risus sagittis ultrices at.',
      isbn: '1231-1231-1231-1233',
      pubDate: '',
      publisher: '출판사명 출판사명',
      title: '도서명 도서명 도서명',
      totalPage: 200
    },
    {
      author: '저자명 저자명',
      bookId: 6,
      coverImage: '',
      description:
        'Lorem ipsum dolor sit amet consectetur. Ac purus ut cras quam. Volutpat aliquam semper sem in purus aliquam eget non. Lacus purus tellus quis euismod condimentum et. Sit condimentum in non sed est. In tellus faucibus pulvinar vestibulum risus sagittis ultrices at.',
      isbn: '1231-1231-1231-1233',
      pubDate: '',
      publisher: '출판사명 출판사명',
      title: '도서명 도서명 도서명',
      totalPage: 200
    },
    {
      author: '저자명 저자명',
      bookId: 7,
      coverImage: '',
      description:
        'Lorem ipsum dolor sit amet consectetur. Ac purus ut cras quam. Volutpat aliquam semper sem in purus aliquam eget non. Lacus purus tellus quis euismod condimentum et. Sit condimentum in non sed est. In tellus faucibus pulvinar vestibulum risus sagittis ultrices at.',
      isbn: '1231-1231-1231-1233',
      pubDate: '',
      publisher: '출판사명 출판사명',
      title: '도서명 도서명 도서명',
      totalPage: 200
    },
    {
      author: '저자명 저자명',
      bookId: 8,
      coverImage: '',
      description:
        'Lorem ipsum dolor sit amet consectetur. Ac purus ut cras quam. Volutpat aliquam semper sem in purus aliquam eget non. Lacus purus tellus quis euismod condimentum et. Sit condimentum in non sed est. In tellus faucibus pulvinar vestibulum risus sagittis ultrices at.',
      isbn: '1231-1231-1231-1233',
      pubDate: '',
      publisher: '출판사명 출판사명',
      title: '도서명 도서명 도서명',
      totalPage: 200
    },
    {
      author: '저자명 저자명',
      bookId: 9,
      coverImage: '',
      description:
        'Lorem ipsum dolor sit amet consectetur. Ac purus ut cras quam. Volutpat aliquam semper sem in purus aliquam eget non. Lacus purus tellus quis euismod condimentum et. Sit condimentum in non sed est. In tellus faucibus pulvinar vestibulum risus sagittis ultrices at.',
      isbn: '1231-1231-1231-1233',
      pubDate: '',
      publisher: '출판사명 출판사명',
      title: '도서명 도서명 도서명',
      totalPage: 200
    },
    {
      author: '저자명 저자명',
      bookId: 10,
      coverImage: '',
      description:
        'Lorem ipsum dolor sit amet consectetur. Ac purus ut cras quam. Volutpat aliquam semper sem in purus aliquam eget non. Lacus purus tellus quis euismod condimentum et. Sit condimentum in non sed est. In tellus faucibus pulvinar vestibulum risus sagittis ultrices at.',
      isbn: '1231-1231-1231-1233',
      pubDate: '',
      publisher: '출판사명 출판사명',
      title: '도서명 도서명 도서명',
      totalPage: 200
    }
  ],
  page: 1,
  scale: 10,
  totalPage: 20
};

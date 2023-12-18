import {TBookDetail} from "@api/types/book";
import styled from "styled-components";

type TProps = {
    bookList: [];
    searchWord: string | null;
    setIsSearch: any;
    setSelectBook: any;
}

export const SearchList = ({
                               bookList,
                               searchWord,
                               setIsSearch,
                               setSelectBook
}: TProps) => {

    const handleClick = (book: {}) => {
        setIsSearch(false);
        console.log(book)
        setSelectBook(book);
    }

    return(
        <StyledResultWrap>
            {bookList?.length !== 0 ? bookList?.map((book: TBookDetail) => (
                <li key={book.bookId} value={book.bookId} onClick={() => {
                    handleClick(book)
                }}>
                    <div className="img-wrap"><img src={book.coverImage} alt="cover-img" /></div>
                    <div className="text-wrap">
                        <h4>{book.title}</h4>
                        <span>{book.author} / {book.publisher}</span>
                        <span>총 {book.totalPage}쪽</span>
                    </div>
                </li>
            )) :
                <p className="empty-list">
                    <span>"{searchWord}"에 대한 검색 결과가 없습니다.</span>
                    <span>직접 입력하기</span>
                </p>

            }
        </StyledResultWrap>
    )
}

const StyledResultWrap = styled.ul`
  border-radius: 10px;
  border: 1px solid #AFB1B6;
  background: #FFF;
  position: absolute;
  left: 50%; top: 18.5%;
  transform: translateX(-50%);
  z-index: 5;
  box-shadow: 0 7px 10px #0000002e;
  width: 326px; max-height: 270px;
  overflow-y: scroll;
  &::-webkit-scrollbar-thumb{
    border-radius: 4px;
    background: #747474;
  }
  &::-webkit-scrollbar{
    width: 4px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  
    li{
      padding: 15px;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      cursor: pointer;
      &:hover{
        background-color: #E3CCF280;
      }
      .img-wrap{
        width: 40px; height: 60px;
        border-radius: 10px;
        overflow: hidden;
        img{
          width: 100%; height: 100%;
          object-fit: cover;
        }
      }
      .text-wrap{
        margin-left: 6px;
        width: 80%;
        h4{
          color: #000;
          font-size: 14px;
          font-style: normal;
          font-weight: 400;
          line-height: 20px;
          letter-spacing: 0.08px;
          overflow:hidden;
          text-overflow:ellipsis;
          white-space:nowrap;
        }
        span{
          color: #ABABAB;
          font-size: 12px;
          font-style: normal;
          font-weight: 400;
          line-height: 20px;
          letter-spacing: 0.08px;
          overflow:hidden;
          text-overflow:ellipsis;
          white-space:nowrap;
          display: block;
        }
      }
    }
  
  .empty-list{
    padding: 15px 15px 0;
    span{
      display: block;
      &:first-child{
        padding-bottom: 15px;
      }
      &:last-child{
        cursor: pointer;
        border-top: 1px solid #AFB1B6;
        color: #ABABAB;
        text-align: center;
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        line-height: 16px;
        letter-spacing: 0.2px;
        padding: 15px 0;
        transition: .2s;
        &:hover{
          color: #000;
        }
      }
    }
  }
`

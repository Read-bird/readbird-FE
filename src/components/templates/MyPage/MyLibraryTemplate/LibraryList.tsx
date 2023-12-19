import styled from "styled-components";
import {Images} from "@/assets";

export const LibraryList = () => {

    const dummy = [
        {
            bookId: 1,
            bookImg: "",
            title: "데미안",
            author: "헤르만 헤세",
            publisher: "민음사",
            totalPage: "240"
        },
        {
            bookId: 2,
            bookImg: "",
            title: "데미안",
            author: "데미안 길어지면데미안 길어지면데미안 길어지면데미안 길어지면",
            publisher: "민음사",
            totalPage: "240"
        },
        {
            bookId: 3,
            bookImg: "",
            title: "데미안 길어지면 데미안 길어지면데미안 길어지면데미안 길어지면",
            author: "헤르만 헤세",
            publisher: "민음사",
            totalPage: "240"
        }
    ]

    return(
        <StyledUl>
            {dummy?.map((item, key) => (
                <li key={key}>
                    <div className="book-img">
                        <Images
                            imgUrl=""
                            imgAlt="book-img"
                        />
                    </div>
                    <div className="book-info">
                        <h3>{item.title}</h3>
                        <p>{item.author}</p>
                        <p>{item.publisher}</p>
                        <span>총 {item.totalPage}쪽</span>
                    </div>
                </li>
            ))}
        </StyledUl>
    )
}

const StyledUl = styled.ul`
  width: 100%;
  margin-top: 36px;
  padding: 0 13px;
    li{
      padding: 8px 12px;
      border-radius: 20px;
      background: rgba(227, 204, 242, 0.50);
      display: flex;
      align-items: flex-start;
      justify-content: flex-start;
      margin-bottom: 15px;
      &:last-child{
        margin: 0;
      }
      .book-img{
        border: 1px solid #ABABAB;
        border-radius: 10px;
        width: 70px; height: 104px;
        overflow: hidden;
        img{
          width: 100%; height: 100%;
          object-fit: cover;
        }
      }
      
      .book-info{
        margin-left: 12px;
        width: 70%;
        h3{
          color: #000;
          font-size: 16px;
          font-style: normal;
          font-weight: 700;
          line-height: 24px;
          overflow:hidden;
          text-overflow:ellipsis;
          white-space:nowrap;
        }
        p{
          color: #747474;
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
          color: #747474;
          font-size: 14px;
          font-style: normal;
          font-weight: 400;
          line-height: 20px;
          letter-spacing: 0.08px;
          display: block;
          margin-top: 18px;
          overflow:hidden;
          text-overflow:ellipsis;
          white-space:nowrap;
        }
      }
    }
`

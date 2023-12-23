import styled from "styled-components";
import {Images} from "@/assets";
import {authFetch} from "@api/axios";
import {useEffect, useState} from "react";

export const LibraryList = () => {

    const [planList, setPlanList] = useState([]);

    const getPlanList = async () => {
        try{
            const res = await authFetch.get("/api/user/plan/success");
            if(res.status === 200){
                setPlanList(res?.data);
            }
        }catch (err){

        }
    }

    useEffect(() => {
        getPlanList();
    }, []);

    return(
        <StyledUl>
            {planList?.map((item, key) => (
                <li key={key}>
                    <div className="book-img">
                        <Images
                            imgUrl={item["Book.coverImage"]}
                            imgAlt="book-img"
                        />
                    </div>
                    <div className="book-info">
                        <h3>{item["Book.title"]}</h3>
                        <p>{item["Book.author"]}</p>
                        <p>{item["Book.publisher"]}</p>
                        <span>총 {item["Book.totalPage"]}쪽</span>
                    </div>
                </li>
            ))}
        </StyledUl>
    )
}

const StyledUl = styled.ul`
  width: 100%;
  margin-top: 36px;
  padding: 0 13px 15px;
  overflow-y: scroll;
  &::-webkit-scrollbar{
    display: none;
  }
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

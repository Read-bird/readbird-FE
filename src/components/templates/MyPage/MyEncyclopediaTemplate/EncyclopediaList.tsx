import styled from "styled-components";
import {PlanModalTemplate} from "@components/templates/PlanModalTemplate";
import {useState} from "react";

export const EncyclopediaList = () => {

    const dummy = [
        {
            characterId: 1,
            characterImg: "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMzA5MjBfMjcw%2FMDAxNjk1MTkyNTk2NzU5.se6L3TYbDZiOH6RU5nEZ6txbZ_C7tJTxpQnnwuySRjYg.vEtVB1n0kWmewRwBlxnsCHU_5B1FoZ6bb7QOqhXnE2Yg.PNG.himelife%2F25.png&type=sc960_832",
            title: "캐릭터명"
        },
        {
            characterId: 2,
            characterImg: "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMzA5MjBfMjcw%2FMDAxNjk1MTkyNTk2NzU5.se6L3TYbDZiOH6RU5nEZ6txbZ_C7tJTxpQnnwuySRjYg.vEtVB1n0kWmewRwBlxnsCHU_5B1FoZ6bb7QOqhXnE2Yg.PNG.himelife%2F25.png&type=sc960_832",
            title: "캐릭터명"
        },        {
            characterId: 3,
            characterImg: "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMzA5MjBfMjcw%2FMDAxNjk1MTkyNTk2NzU5.se6L3TYbDZiOH6RU5nEZ6txbZ_C7tJTxpQnnwuySRjYg.vEtVB1n0kWmewRwBlxnsCHU_5B1FoZ6bb7QOqhXnE2Yg.PNG.himelife%2F25.png&type=sc960_832",
            title: "캐릭터명"
        },        {
            characterId: 4,
            characterImg: "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMzA5MjBfMjcw%2FMDAxNjk1MTkyNTk2NzU5.se6L3TYbDZiOH6RU5nEZ6txbZ_C7tJTxpQnnwuySRjYg.vEtVB1n0kWmewRwBlxnsCHU_5B1FoZ6bb7QOqhXnE2Yg.PNG.himelife%2F25.png&type=sc960_832",
            title: "캐릭터명"
        }
    ]

    const [isOpen, setIsOpen] = useState(false);

    const handleClick = (id: number) => {
        setIsOpen(true);
    }

    return(
        <StyledUl>
            {dummy?.map(item => (
                <li key={item.characterId} onClick={() => handleClick(item.characterId)}>
                    <div>
                        <img src={item.characterImg} alt="character-img"/>
                    </div>
                    <span>{item.title}</span>
                </li>
            ))}

            <PlanModalTemplate
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                modalIndex={4}
            />
        </StyledUl>
    )
}

const StyledUl = styled.ul`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-wrap: wrap;
  margin-top: 36px;
    li{
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 33.33%;
      margin-bottom: 30px;
      cursor: pointer;
      div{
        display: flex;
        width: 96px;
        height: 96px;
        justify-content: center;
        align-items: center;
        flex-shrink: 0;
        border-radius: 50%;
        overflow: hidden;
        border: 1px solid rgba(171, 171, 171, 1);
        img{
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
      span{
        margin-top: 10px;
      }
    }
`

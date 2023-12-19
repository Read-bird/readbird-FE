import {Body, Head, Wrap} from "@components/templates/HomeTemplate/Styled";
import {BackTitle} from "@components/templates/MyPage/BackTitle";
import {EncyclopediaList} from "@components/templates/MyPage/MyEncyclopediaTemplate/EncyclopediaList";

export const MyEncyclopediaTemplate = () => {
    return (
        <Wrap>
            <Head style={{paddingBottom: "10px", flex: "0 0 80px"}}>
                <BackTitle
                    title="나의 도감"
                />
            </Head>
            <Body>
                <EncyclopediaList />
            </Body>
        </Wrap>
    )
}

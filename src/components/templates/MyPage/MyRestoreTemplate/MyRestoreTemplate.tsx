import {Body, Head, Wrap} from "@components/templates/HomeTemplate/Styled";
import {BackTitle} from "@components/templates/MyPage/BackTitle";
import {MyRestoreList} from "@components/templates/MyPage/MyRestoreTemplate/MyRestoreList";


export const MyRestoreTemplate = () => {
    return(
        <Wrap>
            <Head style={{paddingBottom: "10px", flex: "0 0 80px"}}>
                <BackTitle
                    title="플랜 복원"
                />
            </Head>
            <Body>
                <MyRestoreList />
            </Body>
        </Wrap>
    )
}

import {Body, Head, Wrap} from "@components/templates/HomeTemplate/Styled";
import {BackTitle} from "@components/templates/MyPage/BackTitle";
import {LibraryList} from "@components/templates/MyPage/MyLibraryTemplate/LibraryList";

export const MyLibraryTemplate = () => {
    return(
        <Wrap>
            <Head style={{paddingBottom: "10px", flex: "0 0 80px"}}>
                <BackTitle
                    title="나의 서재"
                />
            </Head>
            <Body>
                <LibraryList />
            </Body>
        </Wrap>
    )
}

import {Body, Head, Wrap} from "@components/templates/HomeTemplate/Styled";
import {MyUser} from "@components/templates/MyPageTemplate/MyUser";
import {MyBanner} from "@components/templates/MyPageTemplate/MyBanner";
import {MyMenu} from "@components/templates/MyPageTemplate/MyMenu";

export const MyPageTemplate = () => {

    return(
        <Wrap>
            <Head style={{paddingBottom: "10px", flex: "0 0 80px"}}>
                <MyUser />
            </Head>
            <Body>
                <MyBanner />
                <MyMenu />
            </Body>
        </Wrap>
    )
}

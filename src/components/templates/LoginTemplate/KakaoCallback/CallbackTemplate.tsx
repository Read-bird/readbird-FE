import axios from "axios"
import {useEffect} from "react";
import {authFetch} from "@api/axios";
import {TLoginResType} from "@api/types";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {TAppDispatch} from "@/store/state";
import {setAccessToken} from "@/store/reducers";

export const CallbackTemplate = () => {

    const dispatch = useDispatch<TAppDispatch>();
    const navigate = useNavigate();
    const params = new URL(document.location.toString()).searchParams;
    const code = params.get('code');
    const grantType = "authorization_code";
    const REACT_APP_API_URL: string | undefined = process.env.REACT_APP_API_URL;
    const REST_API_KEY = process.env.REACT_APP_KAKAO_API_KEY;
    const redirectUri: string = "http://localhost:3000/login/auth";

    useEffect(() => {
        handleKakaoLogin();
    }, []);

    const handleKakaoLogin = async () => {
        try{
            const res = await axios.post(
                `https://kauth.kakao.com/oauth/token?grant_type=${grantType}&client_id=${REST_API_KEY}&redirect_uri=${redirectUri}&code=${code}`,
                {},
                {
                    headers: {
                        "Content-type": "application/x-www-form-urlencoded;charset=utf-8"
                    }
                }
            );
            if(res.status === 200){
                const { access_token } = res.data;
                const resData = await axios.post<TLoginResType>(`${REACT_APP_API_URL}api/user/login-guest`, {}, {
                    headers: {
                        Authorization: `Bearer ${access_token}`
                    }
                });
                if(resData.status === 200){
                    const extractedToken = resData.headers?.authorization?.replace("Bearer ", "");
                    localStorage.setItem("rb-access-token", extractedToken);
                    localStorage.setItem("rb-user-info", JSON.stringify(resData.data));
                    dispatch(setAccessToken(resData.data.accessToken));
                    navigate("/");
                }else{
                    console.log("error alert");
                    // navigate("/login");
                }
            }else{
                console.log("kakao error");
                // navigate("/login");
            }
        }catch (err: any){
            alert(err.message);
            navigate("/login");
        }
    }

    return (
        <></>
    )
}

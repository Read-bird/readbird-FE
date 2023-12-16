import {Navigation} from '@components/common/Navigation';
import {NavigateFunction, Outlet, useNavigate} from 'react-router-dom';
import styled from 'styled-components';
import {useEffect} from "react";

export const AppTemplate = () => {

    const navigate = useNavigate();
    const storageAccessToken: string|null = localStorage.getItem("rb-access-token");

    useEffect(() => {
        if(!storageAccessToken){
            navigate("/login");
        }
    }, []);

    return (
        <AppWrap>
            <MainWrap>
                <Outlet/>
            </MainWrap>
            <Navigation/>
        </AppWrap>
    );
};

const AppWrap = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MainWrap = styled.main`
  width: 100%;
  height: calc(100vh - 70px);
`;

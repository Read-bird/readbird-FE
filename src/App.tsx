import { setUserName } from '@/store/reducers';
import { TAppDispatch, TRootState } from '@/store/state';
import { appRouter } from '@routers/appRouter';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouterProvider } from 'react-router-dom';

export const App = () => {
	// redux 저장 세팅
	const dispatch = useDispatch<TAppDispatch>();
	// redux 가져오기
	const testStore = useSelector((state: TRootState) => state.userStore);
	console.log(testStore);

	useEffect(() => {
		// redux 저장
		dispatch(setUserName('Dongwoo'));
	}, []);

	return <RouterProvider router={appRouter} fallbackElement={<div>로딩중...</div>} />;
};

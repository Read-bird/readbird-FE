import {useDispatch, useSelector} from "react-redux";
import { RootState, AppDispatch } from "./store/store"
import {useEffect} from "react";
import {setUserName} from "./store/reducers/userSlice";

const App = () => {

  // redux 저장 세팅
  const dispatch = useDispatch<AppDispatch>();
  // redux 가져오기
  const testStore = useSelector((state: RootState) => state.userStore);
  console.log(testStore);

  useEffect(() => {
    // redux 저장
    dispatch(setUserName("Dongwoo"));
  }, []);

  return (
    <div className="App">
      안녕하세요. 제 이름은 {testStore?.userName}입니다.
    </div>
  );
}

export default App;

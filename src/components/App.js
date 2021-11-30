// import AppRouter from './Router';
import { useEffect, useState } from 'react';
import AppRouter from 'components/Router';

import { authService, dbService, storageService } from 'fbase';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(authService.currentUser);

  // 사용자 정보저장
  const [userObj, setUserObj] = useState(null);


  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      // console.log(user);
      // 로그인처리
      if (user) {
        setIsLoggedIn(user);
        // console.log('uid >>', user.uid);
        setUserObj(user);
      } else {
        setIsLoggedIn(false);
      }
    });
  },[]);
  
  return (
    <div>
      <h1>안부 묻기</h1>
      <AppRouter isLoggedIn={isLoggedIn} userObj={userObj} />
    </div>
  );
}

export default App;

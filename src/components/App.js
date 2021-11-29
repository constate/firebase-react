// import AppRouter from './Router';
import AppRouter from 'components/Router';
import { useEffect, useState } from 'react';

import { authService, dbService, storageService } from 'fbase';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(authService.currentUser);

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      console.log(user);
      // 로그인처리
      if (user) {
        setIsLoggedIn(user);
      } else {
        setIsLoggedIn(false);
      }
    });
  },[]);
  
  return (
    <div>
      <h1>안부 묻기</h1>
      <AppRouter isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
    </div>
  );
}

export default App;

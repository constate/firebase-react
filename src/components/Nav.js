import { Link } from 'react-router-dom';
import { authService } from 'fbase';

function Nav({isLoggedIn}) {
  const logout = event => {
    // firebase logout
    authService.signOut();
  }

  return (
    <div>
      <ul>
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/profile'>Profile</Link></li>
        <li><Link to='/edit'>Edit Profile</Link></li>
        {isLoggedIn ?
          <li>
            <button onClick={logout}>Logout</button><br />
          </li> :
          <>로그인되어있지 않음</>
        }
      </ul>
    </div>
  );
}

export default Nav;
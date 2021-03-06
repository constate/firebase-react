// npm i react-router-dom
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Home from 'routes/Home';
import Profile from 'routes/Profile';
import Auth from 'routes/Auth';
import EditProfile from 'routes/EditProfile';
import Nav from 'components/Nav';

export default function AppRouter({isLoggedIn, userObj}) {
  return (
    <Router>
      <p>로그인 유저: {userObj ? userObj.email : ''}</p>
      <Nav isLoggedIn={isLoggedIn} />
      <Routes>
        {isLoggedIn ? (
          <>
            <Route exact path='/' element={<Home userObj={userObj} />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/edit' element={<EditProfile />} />
          </>
        ) : (
          <Route exact path='*' element={<Auth />} />    
        )}
      </Routes>
    </Router>
  )
}
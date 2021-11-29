// npm i react-router-dom
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Home from 'routes/Home';
import Profile from 'routes/Profile';
import Auth from 'routes/Auth';
import EditProfile from 'routes/EditProfile';
import Nav from 'components/Nav';

export default function AppRouter({isLoggedIn, setIsLoggedIn}) {
  return (
    <Router>
      <Nav />
      <Routes>
        {isLoggedIn ? (
          <>
            <Route exact path='/' element={<Home />} />
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
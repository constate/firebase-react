import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

// fbase 불러오기 테스트
import firebase from './fbase';
console.log(firebase);

ReactDOM.render(<App />, document.getElementById('root'));
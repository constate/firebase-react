import { useState } from 'react';
import { authService, firebaseInstance } from 'fbase';


export default function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const onChange = (event) => {
    // event.target 구조분해
    const {
      target: { name, value }
    } = event;

    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  }

  const onSubmit = async(event) => {
    // 주소가 갱신되는걸 막아줌
    event.preventDefault();
    try {
      let data;
      if (event.target.id === 'loginForm') {
        // 흐름제어(promise, async)
        data = await authService.signInWithEmailAndPassword(email, password);
      } else if (event.target.id === 'joinUsForm') {
        data = await authService.createUserWithEmailAndPassword(email, password);
      }
      // 저장 결과 data
      console.log(data);
    } catch (error) {
      console.log('error!');
      setError(error.message);
    }
    
  };

  const onSnsLogin = async event => {
    // console.log(event.target.name);
    //  fbase.js에 firebase 객체를 사용하도록 설정이 필요
    let provider;
    if (event.target.name === 'google') {
      provider = new firebaseInstance.auth.GoogleAuthProvider();
    } else if (event.target.name === 'github') {
      provider = new firebaseInstance.auth.GithubAuthProvider();
    }
    const data = await authService.signInWithPopup(provider);
    console.log(data);
  };


  return (
    <div>
      <h3>Auth page</h3>
      <p style={{ color: 'red' }}>{error}</p>
      <h4>Login</h4>
      <form id="loginForm" onSubmit={onSubmit}>
        <input type="email" name="email" value={email} onChange={onChange} />
        <input type="password" name="password" value={password} onChange={onChange}/>

        <input type="submit" value="Log in" onChange={onChange}/>
      </form>
      <div>
        <button name="google" onClick={onSnsLogin}>Google Login</button><br />
        <button name="github" onClick={onSnsLogin}>GitHub Login</button>
      </div>
      <hr />
      <h4>회원가입</h4>
      <form id="joinUsForm" onSubmit={onSubmit}>
        사용자 이메일 :{" "}
        <input type="email" name="email" placeholder="이메일 입력" onChange={onChange}/><br />
        비밀번호 :
        <input type="password" name="password" placeholder="비밀번호 입력" onChange={onChange}/><br />

        <input type="submit" value="회원가입" onChange={onChange}/>
      </form>
    </div>
  )
}
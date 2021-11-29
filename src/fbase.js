import firebase from 'firebase/app';
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

// 인증키는 .env 파일에 숨겨두고 gitignore를 통해 github에 공개되지 않도록 설정해야 함
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: "react-firebase-hyun.firebaseapp.com",
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: "react-firebase-hyun.appspot.com",
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID
};

// Initialize Firebase
// export default firebase.initializeApp(firebaseConfig);

firebase.initializeApp(firebaseConfig);

export const authService = firebase.auth();
export const storageService = firebase.storage();
export const dbService = firebase.firestore();
export const firebaseInstance = firebase;
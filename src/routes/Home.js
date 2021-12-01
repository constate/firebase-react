import { authService, dbService, storageService } from 'fbase';
import { useEffect, useState } from 'react';
import Message from './Message';
import { v4 as uuidv4 } from 'uuid';

export default function Home({userObj}) {
  const [msg, setMsg] = useState('');
  const [msgs, setMsgs] = useState([]);

  const [inputFile, setInputFile] = useState('');
  const [prevImgUrl, setPrevImgUrl] = useState('');

  // async function getMsgList() {
  //   const dbMsg = await dbService.collection('messages').get();
  //   dbMsg.forEach((doc) => {
  //     // object id 확인
  //     // console.log(doc.id);
  //     let rowData = doc.data();
  //     rowData.id = doc.id;
  //     setMesgs(function (prev) {
  //       return [rowData, ...prev];
  //     })
  //   });
  // }

  useEffect(() => {
    // getMsgList();
    // 실시간으로 갱신되도록 변경 - 이벤트 핸들러 사용 - .get() 대신 .onSnapshot() 사용
    dbService.collection('messages').onSnapshot(snapshot => {
      const newMsgs = snapshot.docs.map(doc => {
        return ({
          id: doc.id,
          ...doc.data()
        });
      });
      setMsgs(newMsgs)
    });
  }, []);

  async function onSubmit(event) {

    event.preventDefault();
    // 실행순서 1) storage에 저장 2) firestore에 저장
    // 파일 이름 중복방지를 위해 고유한 식별자 만들기 1) timestamp 사용 2) uuid 라이브러리 이용(npm i uuid)
    // storage에 user별로 폴더를 따로 생성해서 이미지 업로드
    // console.log(prevImgUrl);
    // let fileUrl = '';
    // if (prevImgUrl !== '') {
    //   const attachmentRef = storageService.ref().child(`${userObj.uid}/${uuidv4()}`);
    //   const response = await attachmentRef.putString(prevImgUrl, 'data_url');
    //   fileUrl = await response.ref.getDownloadURL();  
    // }
    

    

    // let newData = {
    //   text: msg,
    //   createdAt: Date.now(),
    //   creatorId: userObj.uid,
    //   creatorEmail: userObj.email,
    //   imgUrl: fileUrl,
    // };

    // await dbService.collection('messages').add(newData);
    // setMsg('');
    // onclearImg();
    


    //  --------------------------
    // 데이터 업로드하기
    let newData = {
      text: msg,
      createdAt: Date.now(),
      creatorId: userObj.uid,
      creatorEmail: userObj.email,
    };

    // 사진등록 했는지 분기
    if (inputFile) {
      console.log(inputFile);
      // imgFile 이름 만들기
      const fileDataName = inputFile.name;
      const timestamp = new Date().getTime();
      const storageRef = storageService.ref();
      const suffix = fileDataName.substr(inputFile.name.lastIndexOf("."));
      let newFileName = timestamp + suffix;
      let fileSavePath = storageRef.child(newFileName);

    await fileSavePath.put(inputFile).then(snapshot => {
      snapshot.ref.getDownloadURL().then(downloadUrl => {
        newData = {
          ...newData,
          fileName: newFileName,
          imgUrl: downloadUrl
        }
        dbService.collection('messages').add(newData);
        console.log('데이터 잘 저장됨');
      }).catch(error => {
        console.log('storage add error!! >>> ', error);
      });
      console.log('사진 잘 저장됨');
      
    }).catch(error => {
        console.log('storage add error!! >>> ', error);
      });
    } else {
      await dbService.collection('messages').add(newData);
    }
    setMsg('');
    onclearImg();
    
  }

  function onChange(event) {
    event.preventDefault();
    setMsg(event.target.value);
  }

  async function onChangeImg(event) {
    const readfileURL = URL.createObjectURL(event.target.files[0]);
    setPrevImgUrl(readfileURL);
    setInputFile(event.target.files[0]);
  }

  function onclearImg(event) {
    setPrevImgUrl('');
    document.querySelector('#input_img').value = '';
  }
  

  return (
    <div>
      <h3>Home page</h3>
      <form onSubmit={onSubmit}>
        <input value={msg} type="text" placeholder="무슨 생각을 하고 있나요?" maxLength={120} onChange={onChange} />
        <input type="file" accept="image/*" id="input_img" onChange={onChangeImg}/>
        <input type="submit" value="기록하기" />
      </form>
      <div>
        선택 사진 미리보기 :
        <img id="prev_image" src={prevImgUrl} alt="프리뷰이미지" style={{ width: '100px' }}></img>
        {prevImgUrl && <button onClick={onclearImg}>clear</button>}
      </div>
      {/* msgs.map 을 통해 목록으로 출력 */}
      <h4>목록</h4>
      {msgs.length > 0 ? (
        <ul>
          {msgs.map(msg => {
            return <Message key={msg.id} msg={msg} userObj={userObj} />
          })}
        </ul>
      ):(
        <p>첫번째 생각을 입력해주세요</p>
      )}
    </div>
  )
}
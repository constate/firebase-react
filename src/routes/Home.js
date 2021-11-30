import { authService, dbService, storageService } from 'fbase';
import { useEffect, useState } from 'react';

export default function Home({userObj}) {
  const [msg, setMsg] = useState('');
  const [msgs, setMsgs] = useState([]);

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
    // 데이터 업로드하기
    let newData = {
      text: msg,
      createdAt: Date.now(),
      creatorId: userObj.uid,
    };
    await dbService.collection('messages').add(newData);
    setMsg('');
  }

  function onChange(event) {
    event.preventDefault();
    setMsg(event.target.value);
  }

  return (
    <div>
      <h3>Home page</h3>
      <form onSubmit={onSubmit}>
        <input value={msg} type="text" placeholder="무슨 생각을 하고 있나요?" maxLength={120} onChange={onChange} />
        <input type="submit" value="기록하기" />
      </form>
      {/* msgs.map 을 통해 목록으로 출력 */}
      <h4>목록</h4>
      {msgs.length > 0 ? (
        <ul>
          {msgs.map(msg => {
            return <li key={msg.id}>{msg.text}</li>
          })}
        </ul>
      ):(
        <p>첫번째 생각을 입력해주세요</p>
      )}
    </div>
  )
}
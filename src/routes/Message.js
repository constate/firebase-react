import { dbService, storageService } from 'fbase';
import { useState } from 'react';

export default function Message({ msg, userObj }) {
  const [editing, setEditing] = useState(false);
  const [newMsg, setNewMsg] = useState(msg.text);

  async function onDelClick(objId) {
    // 삭제하기 구현
    // const data = await dbService.collection('messages').doc(objId).delete();
    // firestore에서 데이터 삭제
    await dbService.doc(`messages/${objId}`).delete();

    // storage에서 파일 삭제
    if (msg.imgUrl !== '') {
      // refFromURL() -> downloadURL을 이용해서 삭제
      await storageService.refFromURL(msg.imgUrl).delete();
    }

  }

  return (
    <li style={{ border: '1px solid black', listStyle: 'none'}}>
      <span style={{ display: "inline-block", width: "400px" }}>
        {editing ? (
          <input type="text" value={newMsg} onChange={e => {
            setNewMsg(e.target.value);
          }}/>
        ) : (
          <>
            {msg.text}({msg.creatorEmail})
            {msg.imgUrl &&
              <div>
                <img src={msg.imgUrl} alt="" width={100} />
              </div>
            }
          </>
        )}
        
      </span>
      {userObj.email === msg.creatorEmail ? (
      <>
        <button onClick={e => {
            setEditing(!editing);
            if (editing) {
              // newMsg를 db에 반영하기
              dbService.doc(`messages/${msg.id}`).update({
                text: newMsg
              });
            }
          }}>
            {editing ? "수정완료": "수정"}            
          </button>
        
        <button onClick={e => {
          onDelClick(msg.id);
        }}>삭제</button>
      </>
      ): (
        ''  
      )}
    </li>
  );
}
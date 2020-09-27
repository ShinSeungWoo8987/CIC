import React, {useState} from 'react';
import './Login.css';
import Modal from 'react-modal';

Modal.setAppElement('#root') // Modal 태그 내부에 onRequestClose 같은 속성을 사용하기 위해 선언

function Login() {
    const [modalState, setModalState] = useState(false)
    const changeModalState = (e) => {
        e.preventDefault()
        setModalState(true)
    }
    return(
        <div className="setJoin">
            <a href='login' onClick={(e)=>changeModalState(e)}>로그인</a>
            <Modal 
                isOpen={modalState}
                // shouldCloseOnOverlayClick={false} // 화면 밖 클릭 시 종료되는 기능 제거
                onRequestClose={(e) => setModalState(false)}
                style={
                    {
                        overlay: {
                            backgroundColor: 'rgba(140,140,140,0.9)',
                            zIndex: 3               
                        },
                        content: {
                            position: "fixed",
                            left: '40%',
                            top: '27.5%',
                            width: '425px',
                            height: '250px',
                            borderRadius: 10,
                            boxShadow: '9px 9px 10px #AAAAAA'
                        },
                    }
                }
            >
                <div className="login">
                    <input id="id" type="text" placeholder="아이디"/><br/>
                    <input id="pw" type="text" placeholder="비밀번호"/><br/>
                    <div className="find">
                        <div id="findId">
                            <a href="#">아이디 찾기</a>
                        </div>
                        <div id="blank">
                            |
                        </div>
                        <div id="findPw">
                            <a href="#">비밀번호 찾기</a>
                        </div><br/>
                    </div>
                    <input type="submit" value="로그인"/>
                </div>
            </Modal>
        </div>
    );
}

export default Login;
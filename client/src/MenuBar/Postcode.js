import React, { useContext }  from 'react';
import Modal from 'react-modal';
import DaumPostcode from 'react-daum-postcode';
import Store from '../Store/Store';

function Postcode() {
    const { addressValueDispatch, modalState, modalStateDispatch } = useContext(Store);
    // Postcode Modal Setting
    const closePostcodeModal = (e) => {
        e.preventDefault();
        const newModalState = {
            postcode: false
        }
        modalStateDispatch({type:"CHANGE_MODALSTATE", payload: newModalState});
    }
    // Postcode & Address Value Setting
    const handleComplete = (data) => {
        const newAddressValue = {
            postcode: data.zonecode,
            address1: data.address
        }
        addressValueDispatch({type: 'CHANGE_ADDRESS', payload: newAddressValue});
        const newModalState = {
            postcode: false
        }
        modalStateDispatch({type:"CHANGE_MODALSTATE", payload: newModalState});
    };
    return(
        <Modal 
            isOpen={modalState.postcode}
            style={PostcodeModalStyle}
            onRequestClose={(e)=>closePostcodeModal(e)}
            // shouldCloseOnOverlayClick={false} // 화면 밖 클릭 시 종료되는 기능 제거
        >
            <DaumPostcode
                onComplete={handleComplete}
            />
        </Modal>
    );
}
export default Postcode;

const PostcodeModalStyle = {
    overlay: {
        backgroundColor: 'rgba(140,140,140,0.9)',
        zIndex: 2          
    },
    content: {
        position: "absolute",
        left: '37.5%',
        top: '22.5%',
        width: '500px',
        height: '450px',
        borderRadius: 10,
        boxShadow: '9px 9px 10px #4E4E4E'
    }
}
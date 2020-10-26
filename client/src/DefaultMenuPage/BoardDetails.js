import React, { useContext, useEffect, useState } from 'react';
import Store from '../Store/Store';

function BoardDetails(props) {
    const { boardItemList, globalState, globalStateDispatch } = useContext(Store);
    const [selectedItem, setSelectedItem] = useState({
        title:'', name:'', date:'', image:'', description:''
    });
    const payload = {
        main: globalState.main,
        sub: 'all',
        action: globalState.action,
        num: globalState.num
    }
    const handleClick = (e) =>{
        e.preventDefault();
        globalStateDispatch( {type: 'GLOBAL', payload} )
    }

    console.log(selectedItem);
    useEffect(()=>{
        let _main = '';
        if(globalState.main==='event') _main='eve';
        if(globalState.main==='notice') _main='not';
        if(globalState.main==='center') _main='ser';
        const _boardItemList = boardItemList.filter(i=>i[`${_main}_NUMBER`]===globalState.num);
        setSelectedItem({
            title:_boardItemList[0][`${_main}_TITLE`],
            name:_boardItemList[0][`mem_ID`],
            date:_boardItemList[0][`${_main}_REGISTER`],
            image:_boardItemList[0][`${_main}_IMAGE`] || '',
            description:_boardItemList[0][`${_main}_DESCRIPTION`]
        });
    },[]);
    return (
        <>
            {selectedItem.title}
            {selectedItem.name}
            {selectedItem.date}
            {selectedItem.image}
            {selectedItem.description}
            <button onClick={e=>handleClick(e)}>돌아가기</button>
        </>
    );
}

export default BoardDetails;
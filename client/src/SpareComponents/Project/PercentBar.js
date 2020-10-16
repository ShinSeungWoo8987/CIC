import React, { useContext } from 'react';
import Store from '../Store/Store';
import ProgressBar from 'react-percent-bar'

function PercentBar() {
    const { projectInfomation } = useContext(Store);
    const percent = (projectInfomation.saveMoney/projectInfomation.targetMoney)*100;
    console.log(percent);
    const percentView = percent>100?100:percent;
    let percentBarColor = '';
    // PercentBar Color Setting
    if(percent>70){
        percentBarColor = 'lime';
    }else if(percent>40){
        percentBarColor = 'orange';
    }else{
        percentBarColor = 'black';
    }
    return <ProgressBar width={props => props.width} height={props => props.height} fillColor={percentBarColor} percent={percentView} />;
}
export default PercentBar;
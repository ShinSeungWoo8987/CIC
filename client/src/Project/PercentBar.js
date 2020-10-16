import React from 'react';
import ProgressBar from 'react-percent-bar'

function PercentBar(props) {
    let percentBarColor = '';
    const percentView = props.percent>100?100:props.percent;
    // PercentBar Color Setting
    if(percentView>70){
        percentBarColor = 'lime';
    }else if(percentView>40){
        percentBarColor = 'orange';
    }else{
        percentBarColor = 'black';
    }
    /*
        colorShift : boolean
        일정 퍼센트가 될 때마다 퍼센트바의 색깔이 자동 변경 - PercentBar Color Setting 동일기능
    */
    return <ProgressBar width={props.width} height={props.height} colorShift={props.colorShift} fillColor={percentBarColor} borderColor={props.borderColor} radius={props.radius} percent={percentView} />;
}
export default PercentBar;
// Format - (###,###,###)
const moneyFormat = (money) => {
    const reverseSource = String(money).split("").reverse().join("");
    let result = '';
    var idx=0;
    while(idx<String(reverseSource).length){
        if(idx%3 === 2 && idx !== String(reverseSource).length-1){
            result += String(reverseSource)[idx] + ',';
        }else{
            result += String(reverseSource)[idx]
        }
        idx++;
    }
    return String(result).split("").reverse().join("");
}
const percentFormat = (saveMoney, targetMoney) =>{
    let result = 0;
    if(saveMoney <= 0){
        return result
    }
    result = (saveMoney/targetMoney)*100;
    return parseInt(result);
}
const getRandom = (max, min) => {
    max = Math.floor(max);
    min = Math.ceil(min);
    return Math.floor(Math.random() * (max - min)) + min;
}
export { moneyFormat, percentFormat, getRandom };
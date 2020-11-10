const getRandom = (max, min) => {
    max = Math.floor(max);
    min = Math.ceil(min);
    return Math.floor(Math.random() * (max - min)) + min;
}
const replaceAt = (string, idx, character) => {
    return string.substring(0, idx) + character + string.substring(idx+character.length);
}

const checkInputValueRestirctedCharacter = (inputValue) => {
    const restirctedCharacterList = [" ", "=", "'", "\"", ">", "<", "-"]; // Restricted Charater
    for(var idx=0; idx<restirctedCharacterList.length; idx++){
        if(inputValue.indexOf(restirctedCharacterList[idx]) !== -1)
            return -1
    }
    return 0
}

const checkSearchValueRestirctedCharacter = (inputValue) => {
    const restirctedCharacterList = ["=", "'", "\""]; // Restricted Charater
    for(var idx=0; idx<restirctedCharacterList.length; idx++)
        inputValue = inputValue.replaceAll(restirctedCharacterList[idx],'');
    return inputValue;
}
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
const dDayFormat = (dDay) => {
    if(dDay<0)
        return "마감"
    else
        return parseInt(dDay)
}
const dateFormat = (date) => {
    date = date.replaceAll('-','/').substring(2);
    return date;
}
const idFormat = (id) => {
    const length = id.length;
    const startHiddenNumber = 4;
    for(var idx=startHiddenNumber; idx<length; idx++){
        id = replaceAt(id, idx, "*");
    }
    return id
}
const getMaxBlock = (maxPage, blockPerCnt) => {
    if(maxPage === 0 || maxPage <= blockPerCnt){
        return 1
    }else if(maxPage%blockPerCnt===0){
        return parseInt(maxPage/blockPerCnt)
    }else if(maxPage%blockPerCnt!==0){
        return parseInt(maxPage/blockPerCnt) + 1
    }
}
const getPageCnt = ( maxPage, maxBlock, blockPerCnt, blockNumber ) => {
    if(maxPage === 0)
        return 1
    if(blockNumber < maxBlock)
        return 10;
    if(blockNumber === maxBlock){
        return maxPage%blockPerCnt
    }   
}
export { getRandom, checkInputValueRestirctedCharacter, checkSearchValueRestirctedCharacter, moneyFormat, percentFormat, dDayFormat, dateFormat, idFormat, getMaxBlock, getPageCnt };
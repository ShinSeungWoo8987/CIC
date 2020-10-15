class Util {
    // Format - (###,###,###)
    moneyFormat(money){
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
    // Format - (###,###,###)
    // const changeFormat = (source) => {
    //     const reverseSource = String(source).split("").reverse().join("");
    //     let result = '';
    //     var i=0;
    //     while(i<String(reverseSource).length){
    //         if(i%3 === 2 && i !== String(reverseSource).length-1){
    //             result += String(reverseSource)[i] + ',';
    //         }else{
    //             result += String(reverseSource)[i]
    //         }
    //         i++;
    //     }
    //     return String(result).split("").reverse().join("");
    // }
}
export default new Util()
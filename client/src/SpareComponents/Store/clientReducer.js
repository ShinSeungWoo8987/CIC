// const ..Reducer = (state, { payload }) => payload
const _selectAddressValue = {
    postcode: '테스트 우편번호',
    address: '테스트 주소'
}
const selectAddressValueReducer = (state, {type, payload}) => {
    switch (type) {
        default:
            return _selectAddressValue;
        case 'CHANGE':
            return payload;
    }
}
const loginModalReducer = (state, { type, payload }) => {
    switch (type) {
        default:
            return false;
        case 'CHANGE_MODALSTATE':
            return payload;
    }
}
export {
    _selectAddressValue, selectAddressValueReducer, loginModalReducer
};
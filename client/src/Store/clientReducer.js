// const ..Reducer = (state, { payload }) => payload
const _session = {
    state: false,
    username: localStorage.getItem("authenticatedUser") || '',
    password: '',
    token: localStorage.getItem("token") || ''
}
const sessionReducer = (state, { type, payload }) => {
    switch (type) {
        default:
            return _session;
        case 'SESSION':
            return payload;
    }
}
const _globalState = {
    main: 'all',
    sub: 'all'
}
const globalStateReducer = (state, {type, payload}) => {
    switch (type) {
        default:
            return _globalState;
        case 'GLOBAL':
            return payload;
    }
}
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
    _session, sessionReducer, _globalState, globalStateReducer, _selectAddressValue, selectAddressValueReducer,loginModalReducer
};
// const ..Reducer = (state, { payload }) => payload
const _session = {
    state: false,
    username: localStorage.getItem("authenticatedUser") || '',
    password: '',
    authority: 0,
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
const _addressValue = {
    postcode: '',
    address1: ''
}
const addressValueReducer = (state, {type, payload}) => {
    switch (type) {
        default:
            return _addressValue;
        case 'CHANGE_ADDRESS':
            return payload;
    }
}
const _modalState = {
    login: false,
    postcode: false,
    updateUser: false,
    deleteUser: false
}
const modalStateReducer = (state, { type, payload }) => {
    switch (type) {
        default:
            return false;
        case 'CHANGE_MODALSTATE':
            return payload;
    }
}
const _projectInfomation = {
    name: '기업명 / 이름',
    title: '이곳은 제목이 작성될 자리입니다.',
    dDay: 30,
    fundingCount: 1000,
    targetMoney: 500000,
    saveMoney: 50000000
}
const projectInfomationReducer = (state, {type, payload}) => {
    switch (type) {
        default:
            return false;
        case 'CHANGE_INFOMATION':
            return payload;
    }
}
const detailMainHeaderReducer = (state, { type, payload }) => {
    switch (type) {
        default:
            return 1;
        case 'CHANGE':
            return payload;
    }
}
export {
    _session, sessionReducer, _globalState, globalStateReducer, _addressValue, addressValueReducer, _modalState, modalStateReducer, _projectInfomation, projectInfomationReducer, detailMainHeaderReducer
};
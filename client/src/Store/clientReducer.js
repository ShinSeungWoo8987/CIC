// const ..Reducer = (state, { payload }) => payload
const _viewPage = {
    viewPage:'', pageState:''
}
const _info = {
    project_name: '', category: '', target_money: '', sdate: '', fdate: '', thumbnail: '', logo: '', subDescription:''
};
const _session = {
    state: false,
    username: localStorage.getItem("authenticatedUser") || '',
    password: '',
    authority: 0,
    token: localStorage.getItem("token") || ''
}
const _content = [
    {id:0, head:'text', content:''}
]
const infoReducer = (state, { type, payload }) => {
    switch (type) {
        default:
            return _content;
        case 'CHANGE_INFO':
            return payload;
    }
}
const contentReducer = (state, { type, payload }) => {
    switch (type) {
        default:
            return _content;
        case 'CHANGE':
            return payload;
    }
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
    sub: 'all',
    act:''
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
const pageReducer = (state, { type, payload }) => {
    switch (type) {
        default:
            return true;
        case 'CHANGE_PAGE':
            return payload;
    }
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
    deleteUser: false,
    funding: false
}
const modalStateReducer = (state, { type, payload }) => {
    switch (type) {
        default:
            return false;
        case 'CHANGE_MODALSTATE':
            return payload;
    }
}
// projectInformation 임의로 작성한 코드, 나중에 제거할 것
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
const viewStateReducer = (state, { type, payload }) => {
    switch (type) {
        default:
            return 1;
        case 'CHANGE':
            return payload;
        case 'CHANGE_VIEWPAGE':
            console.log(state);
            return payload;
        case 'CHANGE_PAGESTATE':
            console.log(state);
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
    _session, sessionReducer, _globalState, globalStateReducer, _addressValue, addressValueReducer, _modalState, modalStateReducer, _projectInfomation, projectInfomationReducer, detailMainHeaderReducer, viewStateReducer, _viewPage, _info, _content, infoReducer, contentReducer, pageReducer
};
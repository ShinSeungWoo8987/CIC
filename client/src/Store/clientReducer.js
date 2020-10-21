// const ..Reducer = (state, { payload }) => payload
const _session = {
    state: false,
    username: localStorage.getItem("authenticatedUser") || '',
    password: '',
    authority: '',
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
    // main: 'all',
    // sub: 'all'
    main: 'addProject',
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
const _projectInformation = {
    name: '기업명 / 이름',
    title: '이곳은 제목이 작성될 자리입니다.',
    dDay: 30,
    fundingCount: 1000,
    targetMoney: 500000,
    saveMoney: 50000000
}
const projectInformationReducer = (state, {type, payload}) => {
    switch (type) {
        default:
            return false;
        case 'CHANGE_INFOMATION':
            return payload;
    }
}
const _viewPage = {
    viewPage:'', pageState:''
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
const _info = {
    project_name: '', category: '', target_money: '', sdate: '', fdate: '', thumbnail: '', logo: '', subDescription:''
};
const infoReducer = (state, { type, payload }) => {
    switch (type) {
        default:
            return _content;
        case 'CHANGE_INFO':
            return payload;
    }
}
const _content = [
    {id:0, head:'text', content:''}
]
const contentReducer = (state, { type, payload }) => {
    switch (type) {
        default:
            return _content;
        case 'CHANGE':
            return payload;
    }
}
const pageReducer = (state, { type, payload }) => {
    switch (type) {
        default:
            return true;
        case 'CHANGE_PAGE':
            return payload;
    }
}

export {
    _session, sessionReducer, _globalState, globalStateReducer, _addressValue, addressValueReducer, _modalState, modalStateReducer, _projectInformation, projectInformationReducer,
    viewStateReducer, _viewPage, _info, _content, infoReducer, contentReducer, pageReducer
};
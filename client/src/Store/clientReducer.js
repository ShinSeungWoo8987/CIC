// const ..Reducer = (state, { payload }) => payload
const _session = {
    state: false,
    authority: '',
    token: '',
    userId:''
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
    action: 1,
    num: 0
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
    authority: false,
    funding: false,
    fundingMemberList: false
}
const modalStateReducer = (state, { type, payload }) => {
    switch (type) {
        default:
            return _modalState;
        case 'CHANGE_MODALSTATE':
            return payload;
    }
}

const _search = {
    value: ''
}
const searchReducer = (state, { type, payload }) => {
    switch (type) {
        default:
            return _search;
        case 'SEARCH':
            return payload;
    }
}
const _pageCnt = {
    value: 1
}
const pageCntReducer = (state, { type, payload }) => {
    switch (type) {
        default:
            return _pageCnt;
        case 'MOVE_PAGE':
            return payload;
    }
}
const _projectInformation = {
    number: '',
    title: '',
    target: '',
    logo: '',
    creator: '',
    dDay: '',
    price: '',
    fundingCnt: '',
    save: '',
    percent: ''
}
const projectInformationReducer = (state, { type, payload }) => {
    switch (type) {
        default:
            return projectInformationReducer;
        case 'PROJECT':
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
const pageReducer = (state, { type, payload }) => {
    switch (type) {
        default:
            return true;
        case 'CHANGE_PAGE':
            return payload;
    }
}
const _info = {
    project_name: '', category: '', target_money: '', sdate: '', fdate: '', thumbnail: '', logo: '', funding_price:''
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
const boardItemListReducer = (state, {type, payload})=>{
    switch (type) {
        default:
            return _content;
        case 'CHANGE':
            return payload;
    }
}

export {
    _session, sessionReducer, _globalState, globalStateReducer, _addressValue, addressValueReducer, _modalState, modalStateReducer, _search, searchReducer,
    _pageCnt, pageCntReducer, _projectInformation, projectInformationReducer,
    _viewPage, viewStateReducer, pageReducer, _info, infoReducer, _content, contentReducer, boardItemListReducer
};
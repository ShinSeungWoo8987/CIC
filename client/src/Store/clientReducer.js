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
    // main: 'projectDetails',
    // sub: 'recentlyNews',
    action: '',
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
    fundingMemberList: false,
    fundingDetailList: false,
    find: false
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
    type: '',
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
const _pageNumber = {
    value: 1
}
const pageNumberReducer = (state, { type, payload }) => {
    switch (type) {
        default:
            return _pageNumber;
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
            return _projectInformation;
        case 'PROJECT':
            return payload;
    }
}
const _recentlyNewsInformation = {
    number: '',
    title: '',
    writer: '',
    data: '',
    description: ''
}
const recentlyNewsInformationReducer = (state, { type, payload }) => {
    switch (type) {
        default:
            return _recentlyNewsInformation;
        case 'NEWS':
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
const projectReducer = (state, {type, payload}) => {
    switch (type) {
        default:
            return payload;
        case 'CHANGE':
            return payload;
    }
}


export {
    _session, sessionReducer, _globalState, globalStateReducer, _addressValue, addressValueReducer, _modalState, modalStateReducer, _search, searchReducer,
    _pageNumber, pageNumberReducer, _projectInformation, projectInformationReducer, _recentlyNewsInformation, recentlyNewsInformationReducer,
    _viewPage, viewStateReducer, pageReducer, _info, infoReducer, _content, contentReducer, boardItemListReducer,
    projectReducer
};
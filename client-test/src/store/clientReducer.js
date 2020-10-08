const exampleReducer = (state, { type, payload }) => {
    switch (type) {
        default:
            return true;
        case 'DEFAULT':
            return payload;
    }
}
const _content = [
    {id:0, head:'text', content:''}
]
const _info = {
    project_name: '', category: '', target_money: '', sdate: '', fdate: '', thumbnail: '', logo: '', subDescription:''
};

// const ..Reducer = (state, { payload }) => payload
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
const pageReducer = (state, { type, payload }) => {
    switch (type) {
        default:
            return true;
        case 'CHANGE_PAGE':
            return payload;
    }
}

export {
    _info, _content, infoReducer, contentReducer, exampleReducer, pageReducer
};
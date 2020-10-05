const _content = [
    {id:0, head:'text', content:''}
]

// const ..Reducer = (state, { payload }) => payload
const contentReducer = (state, { type, payload }) => {
    switch (type) {
        default:
            return _content;
        case 'CHANGE':
            return payload;
    }
}
const exampleReducer = (state, { type, payload }) => {
    switch (type) {
        default:
            return true;
        case 'DEFAULT':
            return payload;
    }
}

export {
    _content, contentReducer, exampleReducer
};
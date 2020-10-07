// const ..Reducer = (state, { payload }) => payload
const exampleReducer = (state, { type, payload }) => {
    switch (type) {
        default:
            return true;
        case 'DEFAULT':
            return payload;
    }
}

const _user = [
    {
        id:'',
        pw:'',
        name:'',
        birth:'',
        phone:'',
        postcode:'',
        address1:'',
        address2:''
    }
]
const userReducer = (state, {type, payload}) => {
    switch(type) {
        default:
            return _user;
        case 'INFORMATION':
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

export {
    exampleReducer, _user, userReducer , _content, contentReducer
};
// const ..Reducer = (state, { payload }) => payload
const _user = {
    id: null,
    pw: null,
    name: null,
    birth: null,
    phone: null,
    postcode: null,
    address1: null,
    address2: null
}
const userReducer = (state, { type, payload }) => {
    switch (type) {
        default:
            return _user;
        case 'INFORMATION':
            return payload;
    }
}
const _session = {
    state: false,
    id: null,
    grade: null
}
const sessionReducer = (state, { type, payload }) => {
    switch (type) {
        default:
            return _session;
        case 'SESSION':
            return payload;
    }
}

export {
    _user, userReducer, _session, sessionReducer
};
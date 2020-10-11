// const ..Reducer = (state, { payload }) => payload
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
const _selectAddressState = {
    state: 'default'
}
const selectAddressStateReducer = (state, {type, payload}) => {
    switch (type) {
        default:
            return _selectAddressState;
        case 'CHANGE':
            return payload;
    }
}
export {
    _session, sessionReducer, _globalState, globalStateReducer, _selectAddressState, selectAddressStateReducer
};
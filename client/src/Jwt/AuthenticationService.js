import axios from 'axios'

const executeRegisterService = (username, password, name, birth, phone, postcode, address1, address2)=>{
    return axios.put('/register', {
        username,
        password,
        name,
        birth,
        phone,
        postcode,
        address1,
        address2
    });
}

// send username, password to the SERVER
const executeJwtAuthenticationService = (username, password)=>{
    // return axios.post('/authenticate', {
    return axios.post('/authenticate', {
        username,
        password
    })
}

const executeHelloService = ()=> {
    console.log("===executeHelloService===")
    return axios.get('/hello');
}

const registerSuccessfulLoginForJwt = (authority, token, userId)=>{
    localStorage.setItem('authority', authority);
    localStorage.setItem('token', token);
    localStorage.setItem('userId', userId);
    setupAxiosInterceptors();
}

const setupAxiosInterceptors = ()=> {
    axios.interceptors.request.use(
        config => {
            const token = localStorage.getItem('token');
            if (token) {
                config.headers['Authorization'] = 'ShinSeungWoo ' + token;
            }
            // config.headers['Content-Type'] = 'application/json';
            return config;
        },
        error => {
            Promise.reject(error)
        });
}

const logout = ()=>{
    localStorage.removeItem("token");
    localStorage.removeItem("authority");
    localStorage.removeItem("userId");
}

const isUserLoggedIn=()=>{
    const token = localStorage.getItem('token');
    if (token) {
        return true;
    }
    return false;
}

const getLoggedInUserName = ()=>{
    let user = localStorage.getItem('userId');
    if(user===null) return '';
    return user;
}

export {
    executeRegisterService, executeJwtAuthenticationService, executeHelloService, registerSuccessfulLoginForJwt, setupAxiosInterceptors, logout, isUserLoggedIn, getLoggedInUserName
};


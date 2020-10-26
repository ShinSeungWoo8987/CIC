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
    // return axios.post('http://localhost:5000/authenticate', {
    return axios.post('/authenticate', {
        username,
        password
    })
}

const executeHelloService = ()=> {
    console.log("===executeHelloService===")
    return axios.get('http://localhost:5000/hello');
}

const registerSuccessfulLoginForJwt = (authority, token)=>{
    localStorage.setItem('authority', authority);
    localStorage.setItem('token', token);
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
    //sessionStorage.removeItem('authenticatedUser');
    localStorage.removeItem("authenticatedUser");
    localStorage.removeItem("token");
    localStorage.removeItem("authority");
}

const isUserLoggedIn=()=>{
    
    //let user = sessionStorage.getItem('authenticatedUser')
    const token = localStorage.getItem('token');
    // console.log("===UserloggedInCheck===");
    // console.log(token);

    if (token) {
        return true;
    }
    //if(user===null) return false
    return false;
}

const getLoggedInUserName = ()=>{
    //let user = sessionStorage.getItem('authenticatedUser')
    let user = localStorage.getItem('authenticatedUser');
    if(user===null) return '';
    return user;
}

export {
    executeRegisterService, executeJwtAuthenticationService, executeHelloService, registerSuccessfulLoginForJwt, setupAxiosInterceptors, logout, isUserLoggedIn, getLoggedInUserName
};


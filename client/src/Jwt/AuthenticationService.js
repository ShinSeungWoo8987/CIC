import axios from 'axios'

class AuthenticationService {
    executeRegisterService(username, password, name, birth, phone, postcode, address1, address2) {
        return axios.post('http://localhost:5000/register', {
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
    executeJwtAuthenticationService(username, password) {
        // return axios.post('http://localhost:5000/authenticate', {
        return axios.post('/authenticate', {
            username,
            password
        })
    }

    executeHelloService() {
        console.log("===executeHelloService===")
        return axios.get('http://localhost:5000/hello');        
    }

    registerSuccessfulLoginForJwt(username, token) {
        console.log("===registerSuccessfulLoginForJwt===")
        localStorage.setItem('token', token);
        localStorage.setItem('authenticatedUser', username);
        this.setupAxiosInterceptors();
    }

    setupAxiosInterceptors() {
        axios.interceptors.request.use(
            config => {
                const token = localStorage.getItem('token');
                if (token) {
                    config.headers['Authorization'] = 'Bearer ' + token;
                }
                // config.headers['Content-Type'] = 'application/json';
                return config;
            },
            error => {
                Promise.reject(error)
            });
    }

    logout() {
        //sessionStorage.removeItem('authenticatedUser');
        localStorage.removeItem("authenticatedUser");
        localStorage.removeItem("token");
    }

    isUserLoggedIn() {
        
        //let user = sessionStorage.getItem('authenticatedUser')
        const token = localStorage.getItem('token');
        console.log("===UserloggedInCheck===");
        console.log(token);

        if (token) {
            return true;
        }
        //if(user===null) return false
        return false;
    }

    getLoggedInUserName() {
        //let user = sessionStorage.getItem('authenticatedUser')
        let user = localStorage.getItem('authenticatedUser');
        if(user===null) return '';
        return user;
    }


}

export default new AuthenticationService()
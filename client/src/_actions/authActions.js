import Axios from 'axios'
import Jwt_decode from 'jwt-decode'

export function setAuthToken(token){
    if (token) {
        // Apply authorization token to every request if logged in
        Axios.defaults.headers.common["Authorization"] = token;
    } else {
        // Delete auth header
        delete Axios.defaults.headers.common["Authorization"]
    }
}

export function test(data){
    console.log(`authactions.js`)
}

export function oAuthLogin(token){
    console.log("in authactions.js", token)
    localStorage.setItem("jwtToken", token)
    setAuthToken(token)
}

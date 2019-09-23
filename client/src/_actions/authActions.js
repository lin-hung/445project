import Axios from 'axios'
import Jwt_decode from 'jwt-decode'
import {TESTACTION,SET_CURRENT_USER} from "./actionTypes"

export function setAuthToken(token){//THIS IS NOT A REDUX ACTION
    if (token) {
        // Apply authorization token to every request if logged in
        Axios.defaults.headers.common["Authorization"] = token;
    } else {
        // Delete auth header
        delete Axios.defaults.headers.common["Authorization"]
    }
}

export function testAction(data){
    return{
        type:TESTACTION,
        payload:"abc"
    }
}

export function oAuthLoginAction(token){
    localStorage.setItem('jwtToken',token)
    setAuthToken(token)
    console.log(Jwt_decode(token))
    return{
        type:SET_CURRENT_USER,
        payload:Jwt_decode(token)
    }
}

import Jwt_decode from 'jwt-decode'
import { setAuthToken } from '../resources/utils'
import { SET_CURRENT_USER, TESTACTION } from "./actionTypes"

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

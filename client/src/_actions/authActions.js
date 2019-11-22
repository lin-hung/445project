import Jwt_decode from 'jwt-decode'
import { setAuthToken } from '../resources/utils'
import { SET_CURRENT_USER, LOG_OUT_CURRENT_USER, SET_PROFILE, TESTACTION } from "./actionTypes"

export function testAction(data) {
    return {
        type: TESTACTION,
        payload: "abc"
    }
}

export function oAuthLoginAction(token) {
    localStorage.setItem('jwtToken', token)
    setAuthToken(token)
    return {
        type: SET_CURRENT_USER,
        payload: Jwt_decode(token)
    }
}

export function setProfileAction(profile) {
    return {
        type: SET_PROFILE,
        payload: profile
    }
}
export function logoutAction() {
    localStorage.removeItem('jwtToken')
    setAuthToken(null)
    return {
        type: LOG_OUT_CURRENT_USER
    }
}

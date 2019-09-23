import Axios from 'axios'

export function setAuthToken(token){
    if (token) {
        // Apply authorization token to every request if logged in
        Axios.defaults.headers.common["Authorization"] = token
    } else {
        // Delete auth header
        delete Axios.defaults.headers.common["Authorization"]
    }
}

export const mapAuthStateToProps = state => ({
    auth: state.auth
})
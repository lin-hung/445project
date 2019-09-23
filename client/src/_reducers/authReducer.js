import isEmpty from 'is-empty'
import {SET_CURRENT_USER, TESTACTION} from "../_actions/actionTypes"

const initialState = {
    isAuthed: false,
    user: {},
    loading: false
}

export default function(state = initialState, action) {
    switch (action.type) {
      case TESTACTION:
        return {
          ...state,
          a:action.payload
        }
      case SET_CURRENT_USER:{
        console.log(`in authreducer.js ${action.payload}`)
        return{
          ...state,
          a:'SET CURRENT USER',
          isAuthed:!isEmpty(action.payload),
          user:action.payload
        }
      }
      default:
        return state
    }
  }
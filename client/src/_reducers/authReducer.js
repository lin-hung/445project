import isEmpty from 'is-empty'
import {SET_CURRENT_USER, TESTACTION, LOG_OUT_CURRENT_USER} from "../_actions/actionTypes"

const initialState = {
    isAuthed: false,
    user: {}
  }

export default function(state = initialState, action) {
    switch (action.type) {
      case TESTACTION:
        return {
          ...state,
          a:action.payload
        }
      case SET_CURRENT_USER:{
        return{
          ...state,
          a:'SET CURRENT USER',
          isAuthed:!isEmpty(action.payload),
          user:action.payload
        }
      }
      case LOG_OUT_CURRENT_USER:{
        return{
          ...state,
          a:'logged out',
          isAuthed:false,
          user:{}
        }
      }
      default:
        return state
    }
  }
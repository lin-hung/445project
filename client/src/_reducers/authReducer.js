import isEmpty from 'is-empty'
import { SET_CURRENT_USER, TESTACTION, LOG_OUT_CURRENT_USER, SET_PROFILE } from "../_actions/actionTypes"

const initialState = {
  isAuthed: false,
  user: {},
  profile: {}
}

export default function (state = initialState, action) {
  switch (action.type) {
    case TESTACTION:
      return {
        ...state,
        a: action.payload
      }
    case SET_CURRENT_USER: {
      return {
        ...state,
        isAuthed: !isEmpty(action.payload),
        user: action.payload
      }
    }
    case LOG_OUT_CURRENT_USER: {
      return {
        ...state,
        isAuthed: false,
        user: null,
        profile:null
      }
    }
    case SET_PROFILE: {
      return {
        ...state,
        profile: action.payload
      }
    }
    default:
      return state
  }
}
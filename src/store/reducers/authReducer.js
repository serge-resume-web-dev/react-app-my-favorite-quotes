import { AUTH_SUCCESS, AUTH_LOGOUT, SET_USER_INFO, AUTH_ERROR  } from "../actions/authActions"

const initState = {}

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case AUTH_SUCCESS:
    return{...state, token: action.token, authError: null};
    case AUTH_ERROR:
    return {...state, authError: action.authError};
    case AUTH_LOGOUT:
    return {...state, token: null, userInfo: null};
    case SET_USER_INFO:
    return {...state, userInfo: action.userInfo}
    default:
      return state;
  }  
};

export default authReducer
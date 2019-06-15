import axios from 'axios'

// actions types:
export const AUTH_SUCCESS = 'AUTH_SUCCESS'
export const AUTH_ERROR = 'AUTH_ERROR'
export const AUTH_LOGOUT = 'AUTH_LOGOUT'
export const SET_USER_INFO = 'SET_USER_INFO'

// action creators:
export const auth = (email, password, displayName, isLogin) => async dispatch => {
    
    let authData = {
        email,
        password,
        returnSecureToken: true
    };
    // define if it is login or signUp:
    let url = '';
    if (isLogin) {
       url =  'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyAWmVcy_dnTtXe_hn0CNC3d16U6q-UlqRI';
       
    }else{
        url='https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyAWmVcy_dnTtXe_hn0CNC3d16U6q-UlqRI';
        authData = {
            email,
            password,
            displayName,
            returnSecureToken: true
        };
    }
    // async request:
    try{
        const response =  await axios.post(url, authData);
        const data = response.data;

        const user = await axios.post('https://www.googleapis.com/identitytoolkit/v3/relyingparty/getAccountInfo?key=AIzaSyAWmVcy_dnTtXe_hn0CNC3d16U6q-UlqRI', { idToken: data.idToken});


        // set the browser's local storage with response data:
        localStorage.setItem('token', data.idToken);
        localStorage.setItem('userID', data.localId);
        const expirationDate = new Date(new Date().getTime() + data.expiresIn*1000);
        localStorage.setItem('expirationDate', expirationDate);
        localStorage.setItem('userName', user.data.users[0].displayName);
        dispatch(authSuccess(data.idToken));
        dispatch(autoLogout(data.expiresIn));
        dispatch(setUserInfo(user.data.users[0].displayName));
    }catch(error){
        console.log(error);
        dispatch(loginError(error.message));
    } 
};

export const authSuccess = (token) => {
    return{
        type: AUTH_SUCCESS,
        token
    }
}
// auto logout when the session time expires( in 1hour for example)
export const autoLogout = (time) => dispatch =>{
    setTimeout( ()=>{
        dispatch(logout())
    }, time*1000 );
};

// logout function:
export const logout = () => {
    // clear the browser's local storage:
    localStorage.removeItem('token');
    localStorage.removeItem('userID');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userName');
  return{
      type: AUTH_LOGOUT,
  }
}

//auto login function:
export const autoLogIn = () => dispatch => {
    const token = localStorage.getItem('token');
    const userName = localStorage.getItem('userName');
    if (!token) {
        dispatch(logout());// if no token 
    }else{
        const expirationDate = new Date(localStorage.getItem('expirationDate'));
        if (expirationDate <= new Date()) {
            dispatch(logout());// if token date is expired
        }else{
            // if token is valid, set authSuccess and autoLogout with time
            dispatch(authSuccess(token));
            dispatch(setUserInfo(userName));
            dispatch( autoLogout((expirationDate.getTime() - new Date().getTime() ) / 1000));
        }

    }
};

export const setUserInfo = (userInfo) => {
    return{
        type: SET_USER_INFO,
        userInfo
    }
};

export const loginError = (authError) => {
    return{
        type: AUTH_ERROR ,
        authError
    }
};
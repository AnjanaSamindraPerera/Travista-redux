import {
  SET_USER,
  SET_ERRORS,
  CLEAR_ERRORS,
  LOADING_UI,
  SET_UNAUTHENTICATED,
  LOADING_USER,
  NOTIFICATIONS_READ,
  FORGOT_PASSWORD,
  SET_MESSAGES,
  CLEAR_MESSAGES,
  CHANGE_PASSWORD
} from '../types';
import axios from 'axios';

export const loginUser = (userData, history) => dispatch => {
  //dispatch beacause we have asychronous code

  dispatch({ type: LOADING_UI }); //action

  axios
    .post('/login', userData)
    .then(res => {
      setAuthorizationHeader(res.data.token); //call function

      dispatch(getUserData());
      dispatch({ type: CLEAR_ERRORS });

      history.push('/'); //use in react to push a url and got to that path
    })
    .catch(err => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data //to global state
      });
    });
};

export const signupUser = (newUserData, history) => dispatch => {
  //dispatch beacause we have asychronous code

  dispatch({ type: LOADING_UI }); //action

  axios
    .post('/signup', newUserData)
    .then(res => {
      setAuthorizationHeader(res.data.token); //call function
      dispatch(getUserData());
      dispatch({ type: CLEAR_ERRORS });

      history.push('/'); //use in react to push a url and got to that path
    })
    .catch(err => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data //to global state
      });
    });
};

export const logoutUser = () => dispatch => {
  localStorage.removeItem('FBIdToken'); //delete local storage auth header
  delete axios.defaults.headers.common['Authorization']; //delete axios auth  header
  window.location.href = '/login';
  dispatch({ type: SET_UNAUTHENTICATED });
};

export const getUserData = () => dispatch => {
  dispatch({ type: LOADING_USER });
  axios
    .get('/user')
    .then(res => {
      dispatch({
        type: SET_USER,
        payload: res.data
      });
    })
    .catch(err => console.log(err));
};

export const uploadImage = formData => dispatch => {
  dispatch({ type: LOADING_USER });

  axios
    .post('/user/imagePro', formData)
    .then(() => {
      dispatch(getUserData());
    })
    .catch(err => console.log(err));
};

export const uploadCoverImage = formData => dispatch => {
  dispatch({ type: LOADING_USER });

  axios
    .post('/user/imageCover', formData)
    .then(() => {
      dispatch(getUserData());
    })
    .catch(err => console.log(err));
};

//edit details about user
export const editUserDetails = userData => dispatch => {
  console.log(userData);
  dispatch({ type: LOADING_USER });
  axios
    .post('/user', userData)
    .then(() => {
      dispatch(getUserData());
    })
    .catch(err => console.log(err));
};

const setAuthorizationHeader = token => {
  const FBIdToken = `Bearer ${token}`;
  localStorage.setItem('FBIdToken', FBIdToken); //when we get token res.data we need to store it locally if something happen to connection

  axios.defaults.headers.common['Authorization'] = FBIdToken; //add authorizatio header to authenicated routes
};

//read notifications
export const markNotificationsRead = notificationIds => dispatch => {
  axios
    .post('/notification', notificationIds)
    .then(res => {
      dispatch({
        type: NOTIFICATIONS_READ
      });
    })
    .catch(err => console.log(err));
};

//recover password
export const recoverPassword = data => dispatch => {
  axios
    .post('/user/reset', data)
    .then(res => {
      dispatch({ type: CLEAR_ERRORS });

      dispatch({
        type: FORGOT_PASSWORD,
        payload: res.data
      });
      dispatch({
        type: SET_MESSAGES,
        payload: res.data //to global state
      });
      dispatch({ type: CLEAR_MESSAGES });
    })
    .catch(err => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data //to global state
      });
    });
};

//change password
export const changePassword = data => dispatch => {
  axios
    .post('/user/change', data)
    .then(res => {
      dispatch({ type: CLEAR_ERRORS });

      dispatch({
        type: CHANGE_PASSWORD,
        payload: res.data
      });
      dispatch({
        type: SET_MESSAGES,
        payload: res.data //to global state
      });
      dispatch({ type: CLEAR_MESSAGES });
    })
    .catch(err => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data //to global state
      });
    });
};

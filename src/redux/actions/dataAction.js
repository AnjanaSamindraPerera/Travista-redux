import { SET_ADS, LOADING_DATA, LIKE_AD, UNLIKE_AD } from '../types';
import axios from 'axios';

//get all advertisments
export const getAds = () => {
  dispatch({ type: LOADING_DATA });
  axios
    .get('/screams')
    .then(res => {
      dispatch({
        type: SET_ADS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: SET_ADS,
        payload: []
      });
    });
};

//like a advertisment

//unlike a advertisment

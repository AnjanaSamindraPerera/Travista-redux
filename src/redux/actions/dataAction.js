import { SET_ADS, LOADING_DATA, LIKE_AD, UNLIKE_AD, DELETE_AD } from '../types';
import axios from 'axios';

//get all advertisments
export const getAds = () => dispatch => {
  dispatch({ type: LOADING_DATA });
  axios
    .get('/ads')
    .then(res => {
      // console.log(res);
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
export const likeAd = adId => dispatch => {
  axios
    .get(`/ad/${adId}/like`)
    .then(res => {
      dispatch({
        type: LIKE_AD,
        payload: res.data
      });
    })
    .catch(err => console.log(err));
};

//unlike a advertisment
export const unlikeAd = adId => dispatch => {
  axios
    .get(`/ad/${adId}/unlike`)
    .then(res => {
      dispatch({
        type: UNLIKE_AD,
        payload: res.data
      });
    })
    .catch(err => console.log(err));
};

//delete a advertisment

export const deleteAd = adId => dispatch => {
  axios
    .delete(`/ad/${adId}`)
    .then(() => {
      dispatch({ type: DELETE_AD, payload: adId });
    })
    .catch(err => console.log(err));
};

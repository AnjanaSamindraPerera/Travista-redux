import { SET_ADS, LIKE_AD, UNLIKE_AD, LOADING_DATA, DELETE_AD } from '../types';

const initialState = {
  ads: [], //all ads
  ad: {}, //details of one ad
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOADING_DATA:
      return {
        ...state,
        loading: true
      };
    case SET_ADS:
      return {
        ...state,
        ads: action.payload,
        loading: false
      };
    case LIKE_AD:
    case UNLIKE_AD:
      let index = state.ads.findIndex(ad => ad.adId === action.payload.adId); //find ad
      state.ads[index] = action.payload;
      return {
        ...state
      };
    case DELETE_AD:
      let num = state.ads.findIndex(ad => ad.adId === action.payload); //find index and remove
      state.ads.splice(num, 1); //splice remove elements from array starting index from 1 index
      return {
        ...state
      };
    default:
      return state;
  }
}

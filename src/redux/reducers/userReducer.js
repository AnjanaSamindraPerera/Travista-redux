import {
  SET_USER,
  SET_AUTHENTICATED,
  SET_UNAUTHENTICATED,
  LOADING_USER,
  LIKE_AD,
  UNLIKE_AD,
  NOTIFICATIONS_READ,
  FORGOT_PASSWORD
} from '../types';

const initialState = {
  authenticated: false,
  loading: false,
  credentials: {},
  likes: [],
  notifications: [],
  reviews: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_AUTHENTICATED:
      return {
        ...state, //spreading
        authenticated: true
      };
    case SET_UNAUTHENTICATED:
      return initialState;
    case SET_USER:
      return {
        authenticated: true,
        loading: false,
        ...action.payload // credentials: action.payload[0]
      };
    case LOADING_USER:
      return {
        ...state,
        loading: true
      };
    case LIKE_AD:
      return {
        ...state,
        likes: [
          ...state.likes,
          {
            userHandle: state.credentials.handle,
            adId: action.payload.adId
          }
        ]
      };
    case UNLIKE_AD:
      return {
        ...state,
        likes: state.likes.filter(like => like.adId !== action.payload.adId) //unlike a scream filter ou
      };

    case NOTIFICATIONS_READ:
      state.notifications.forEach(n => (n.read = true));
      return {
        ...state
      };
    case FORGOT_PASSWORD:
      return {
        ...state
      };
    default:
      return state;
  }
}

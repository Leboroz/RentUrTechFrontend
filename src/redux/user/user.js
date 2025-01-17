import axios from 'axios';
import toastify from '../../logic/toastify';
import { loadState, saveState, removeState } from '../../logic/localStorage';
import queryClient from '../../logic/queryClient';

const GET_USER = 'user/GET_USER';
const POST_USER = 'user/POST_USER';
const LOGIN_USER = 'user/LOGIN_USER';
const LOGOUT_USER = 'user/LOGOUT_USER';

const initialState = loadState('auth');

export const getUser = (payload) => ({
  type: GET_USER,
  payload,
});

export const postUser = (payload) => ({
  type: POST_USER,
  payload,
});

export const login = (payload) => ({
  type: LOGIN_USER,
  payload,
});

export const authenticateUser = (user) => async (dispatch) => {
  await axios.post('https://rent-ur-tech.onrender.com', {
    username: user.username,
    password: user.password,
  })
    .then((res) => {
      if (res.status === 200) {
        toastify('🦄 Logged in successfully!', 'success');
        const user = {
          user: res.data.user,
          token: res.data.auth_token,
        };
        dispatch(login(user));
        saveState(user, 'auth');
      }
    }).catch((e) => {
      toastify(e.response.data.error, 'error');
    });
};

export const postUserToAPI = (user) => async (dispatch) => {
  await axios.post('https://rent-ur-tech.onrender.com',
    {
      user,
    })
    .then((response) => {
      if (response.status === 201) {
        toastify('🦄 User Created!', 'success');
        dispatch(postUser(response.data));
        saveState(response.data, 'auth');
      }
    }).catch((e) => {
      toastify(e.response.data.errors, 'error');
    });
};

export const deleteToken = () => ({
  type: LOGOUT_USER,
  payload: null,
});

export const logOut = () => (dispatch) => {
  removeState('auth');
  dispatch(deleteToken());
  queryClient.resetQueries('reservations_list');
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER: {
      return action.payload;
    }
    case POST_USER: {
      return { ...action.payload };
    }
    case LOGIN_USER: {
      return action.payload;
    }
    case LOGOUT_USER: {
      return null;
    }
    default:
      return state;
  }
};

export default authReducer;

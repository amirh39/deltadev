import axios from 'axios';
import { setAlert } from './alert.js';
import {
  GET_POSTS,
  POST_ERROR,
  UPDATE_LIKES,
  DELETE_POST,
  ADD_POST,
  GET_POST,
  ADD_COMMENT,
  REMOVE_COMMENT
} from './types.js';

export const getPosts = () => async dispatch => {
  try {
    const res = await axios.get('/api/posts');

    dispatch({
      type: GET_POSTS,
      payload: res.data
    });
  } catch (e) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: e.response.statusText, status: e.response.status }
    });
  }
};

export const addLike = pid => async dispatch => {
  try {
    const res = await axios.put(`/api/posts/like/${pid}`);

    dispatch({
      type: UPDATE_LIKES,
      payload: { pid, likes: res.data }
    });
  } catch (e) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: e.response.statusText, status: e.response.status }
    });
  }
};

export const removeLike = pid => async dispatch => {
  try {
    const res = await axios.put(`/api/posts/unlike/${pid}`);

    dispatch({
      type: UPDATE_LIKES,
      payload: { pid, likes: res.data }
    });
  } catch (e) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: e.response.statusText, status: e.response.status }
    });
  }
};

export const deletePost = pid => async dispatch => {
  try {
    await axios.delete(`/api/posts/${pid}`);

    dispatch({
      type: DELETE_POST,
      payload: pid
    });

    dispatch(setAlert('Post Removed', 'success'));
  } catch (e) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: e.response.statusText, status: e.response.status }
    });
  }
};

export const addPost = formData => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    const res = await axios.post('/api/posts', formData, config);

    dispatch({
      type: ADD_POST,
      payload: res.data
    });

    dispatch(setAlert('Post Created', 'success'));
  } catch (e) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: e.response.statusText, status: e.response.status }
    });
  }
};

export const getPost = pid => async dispatch => {
  try {
    const res = await axios.get(`/api/posts/${pid}`);

    dispatch({
      type: GET_POST,
      payload: res.data
    });
  } catch (e) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: e.response.statusText, status: e.response.status }
    });
  }
};

export const addComment = (pid, formData) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    const res = await axios.post(`/api/posts/comment/${pid}`, formData, config);

    dispatch({
      type: ADD_COMMENT,
      payload: res.data
    });

    dispatch(setAlert('Comment Added', 'success'));
  } catch (e) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: e.response.statusText, status: e.response.status }
    });
  }
};

export const deleteComment = (pid, cid) => async dispatch => {
  try {
    const res = await axios.delete(`/api/posts/comment/${pid}/${cid}`);

    dispatch({
      type: REMOVE_COMMENT,
      payload: cid
    });

    dispatch(setAlert('Comment Removed', 'success'));
  } catch (e) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: e.response.statusText, status: e.response.status }
    });
  }
};

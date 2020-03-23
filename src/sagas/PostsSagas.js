import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { types } from '../actions';

const ROOT_URL = '//reduxblog.herokuapp.com/api';
const API_KEY = '?key=cseckler1234';

// Watcher sagas
// Listen for an action and run the appropriate Worker saga
export function* watchFetchPost() {
  yield takeEvery(types.FETCH_POST, workFetchPost);
}

export function* watchFetchPosts() {
  yield takeEvery(types.FETCH_POSTS, workFetchPosts);
}

export function* watchCreatePost() {
  yield takeEvery(types.CREATE_POST, workCreatePost);
}

export function* watchDeletePost() {
  yield takeEvery(types.DELETE_POST, workDeletePost);
}

// Worker sagas
// Respond to the actions that are caught by the watcher sagas
export function* workFetchPosts() {
  try {
    // Try to call the API
    const uri = `${ROOT_URL}/posts${API_KEY}`;
    const response = yield call(axios.get, uri);

    // Dispatch the action to the reducers
    yield put({
      type: types.FETCH_POSTS_SUCCESS,
      payload: response.data
    });
  } catch (error) {
    // Act on the error
    console.log('Request failed! Could not fetch posts.');
  }
}

export function* workFetchPost({ id }) {
  try {
    // Try to call the API
    const uri = `${ROOT_URL}/posts/${id}${API_KEY}`;
    const response = yield call(axios.get, uri);

    // Dispatch the action to the reducers
    yield put({
      type: types.FETCH_POST_SUCCESS,
      payload: response.data
    });
  } catch (error) {
    // Act on the error
    console.log('Request failed! Could not fetch post.');
  }
}

export function* workCreatePost({ values, callback }) {
  try {
    // Try to call the API
    const uri = `${ROOT_URL}/posts${API_KEY}`;
    const response = yield call(axios.post, uri, values);

    callback();

    // Dispatch the action to the reducers
    yield put({
      type: types.CREATE_POST_SUCCESS,
      payload: response.data
    });
  } catch (error) {
    // Act on the error
    console.log('Request failed! Could not create post.');
  }
}

export function* workDeletePost({ id, callback }) {
  try {
    // Try to call the API
    const uri = `${ROOT_URL}/posts/${id}${API_KEY}`;
    const response = yield call(axios.delete, uri);

    callback();

    // Dispatch the action to the reducers
    yield put({
      type: types.DELETE_POST_SUCCESS,
      payload: response.data
    });
  } catch (error) {
    // Act on the error
    console.log('Request failed! Could not delete post.');
  }
}

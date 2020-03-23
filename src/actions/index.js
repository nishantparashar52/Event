import axios from 'axios';

export const types = {
  FETCH_POST: 'FETCH_POST',
  FETCH_POST_SUCCESS: 'FETCH_POST_SUCCESS',
  FETCH_POSTS: 'FETCH_POSTS',
  FETCH_POSTS_SUCCESS: 'FETCH_POSTS_SUCCESS',
  CREATE_POST: 'CREATE_POST',
  CREATE_POST_SUCCESS: 'CREATE_POST_SUCCESS',
  DELETE_POST: 'DELETE_POST',
  DELETE_POST_SUCCESS: 'DELETE_POST_SUCCESS'
};

export const fetchPosts = () => ({ type: types.FETCH_POSTS });
export const fetchPost = id => ({ type: types.FETCH_POST, id });
export const createPost = (values, callback) => ({
  type: types.CREATE_POST,
  values,
  callback
});
export const deletePost = (id, callback) => ({
  type: types.DELETE_POST,
  id,
  callback
});

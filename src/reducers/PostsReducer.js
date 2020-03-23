import { mapKeys } from 'lodash';
import { types } from '../actions';

export default (state = {}, action) => {
  switch (action.type) {
    case types.FETCH_POST_SUCCESS:
      // Copy the current state and set a new property with a dynamic key value and the payload as the value
      return { ...state, [action.payload.id]: action.payload };
    case types.FETCH_POSTS_SUCCESS:
      // Create a new state object that uses an AJAX request response and grabs the 'id' property from each object in the response to use as its key
      return mapKeys(action.payload, 'id');
    case types.CREATE_POST_SUCCESS:
      // Copy the current state and set a new property with a dynamic key value and the payload as the value
      return { ...state, [action.payload.id]: action.payload };
    case types.DELETE_POST_SUCCESS:
      // Copy the current state and delete the property with the specified key
      var newState = { ...state };
      delete newState[action.payload.id];
      return newState;
  }

  return state;
};

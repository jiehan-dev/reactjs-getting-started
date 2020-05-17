import * as types from './actionTypes';
import * as authorApi from '../../api/authorApi';
import { beginApiCall, apiCallError } from './apiStatusActions';

export function loadAuthorsSuccess(authors) {
  return {
    type: types.LOAD_AUTHORS_SUCCESS,
    authors
  };
}

export function loadAuthors() {
  // Redux thunk injects dispatch so we dont have to
  return function (dispatch) {
    dispatch(beginApiCall());

    return authorApi
      .getAuthors()
      .then((authors) => {
        dispatch(loadAuthorsSuccess(authors));
      })
      .catch((error) => {
        dispatch(apiCallError());
        throw error;
      });
  };
}
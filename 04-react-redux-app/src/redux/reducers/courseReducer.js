import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function courseReducer(state = initialState.courses, action) {
  // the object we return from reducer become the new state
  switch (action.type) {
    case types.CREATE_COURSE_SUCCESS:
      // VVV dont do this, we shouldn't mutate state
      // state.push(action.course);

      // instead:
      return [...state, { ...action.course }];

    case types.UPDATE_COURSE_SUCCESS:
      return state.map((course) => (course.id === action.course.id ? action.course : course));

    case types.LOAD_COURSES_SUCCESS:
      return action.courses;

    case types.DELETE_COURSE_OPTIMISTIC:
      return state.filter((course) => course.id !== action.course.id);

    default:
      return state;
  }
}

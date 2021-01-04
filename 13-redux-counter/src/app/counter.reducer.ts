/**
 * Counter Reducer
 */
import { Reducer, Action } from 'redux';
import { AppState } from './app.state';
// We start by importing the constants INCREMENT and DECREMENT,
// which are exported by our action creators.
import {
  INCREMENT,
  DECREMENT
} from './counter.actions';

// The initialState is an AppState which sets the counter to 0.
const initialState: AppState = { counter: 0 };

// The counterReducer handles two actions: INCREMENT, which adds 1 to the current counter and DECREMENT,
// which subtracts 1.
export const counterReducer: Reducer<AppState> = (state: AppState = initialState, action: Action): AppState =>
{
    // use Object.assign to ensure that we don’t mutate the old state, but
    // instead create a new object that gets returned as the new state.
    switch (action.type) {
    case INCREMENT:
      return Object.assign({}, state, { counter: state.counter + 1 });
    case DECREMENT:
      return Object.assign({}, state, { counter: state.counter - 1 });
    default:
      return state;
    }
};

import {
  Action,
  ActionCreator
} from 'redux';

export const INCREMENT: string = 'INCREMENT';
export const DECREMENT: string = 'DECREMENT';

// ActionCreator is a generic class defined by Redux that we use to define
// functions that create actions. In this case we’re using the concrete class Action,
// but we could use a more specific Action class, such as AddMessageAction that we
// defined in the last section.
export const increment: ActionCreator<Action> = () => ({
  type: INCREMENT
});

export const decrement: ActionCreator<Action> = () => ({
  type: DECREMENT
});

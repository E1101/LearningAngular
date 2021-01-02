import {
  Action,
  Reducer,
  Store
} from './lib/miniRedux';

// messages will be an array of strings, with each string
// representing an individual message in the application.
interface AppState {
  messages: string[];
}

interface AddMessageAction extends Action {
  message: string;
}

// If our messages were objects, we could assign each message an id property
// when it is created. However, to simplify this example, our messages are just
// simple strings, so we’ll have to get a handle to the message another way.
// The easiest way for now is to just use the index of the message in the
// array (as a proxy for the ID).
interface DeleteMessageAction extends Action {
  index: number;
}

// Remember that our reducers must be pure and not mutate the old state.
let reducer: Reducer<AppState> = (state: AppState, action: Action): AppState =>
{
  // Keeping a string in a type field (where type means “action-type”) is a straightforward,
  // portable way we can use to distinguish different types of actions and handle them in
  // one reducer. In part, it means that you don’t have to create a new interface for every action.
  switch (action.type) {
  // create a copy of the state.messages array and add our new message to the copy.
  case 'ADD_MESSAGE':
    return {
      messages: state.messages.concat(
        // The syntax <AddMessageAction>action will cast our action to the more specific type.
        // We use parentheses to make sure the compiler knows that we want to cast action and not action.message.
        (<AddMessageAction>action).message
      ),
    };
  case 'DELETE_MESSAGE':
    let idx = (<DeleteMessageAction>action).index;
    return {
      // we use the slice operator twice. First we take all of the items up until
      // the item we are removing. And we concatenate the items that come after.
      messages: [
        ...state.messages.slice(0, idx),
        ...state.messages.slice(idx + 1, state.messages.length)
      ]
    };
  default:
    return state;
  }
};

// create a new store
let store = new Store<AppState>(reducer, { messages: [] });
console.log(store.getState()); // -> { messages: [] }

// Instead of creating these objects as an object directly we should create a
// function that will create these action objects. This idea of writing a function to
// create actions is so common in Redux that the pattern has a name: Action Creators.

// cast each object to an AddMessageAction
store.dispatch({
  type: 'ADD_MESSAGE',
  message: 'Would you say the fringe was made of silk?'
} as AddMessageAction);

store.dispatch({
  type: 'ADD_MESSAGE',
  message: 'Wouldnt have no other kind but silk'
} as AddMessageAction);

store.dispatch({
  type: 'ADD_MESSAGE',
  message: 'Has it really got a team of snow white horses?'
} as AddMessageAction);

console.log(store.getState());
// -> 
// { messages:
//    [ 'Would you say the fringe was made of silk?',
//      'Wouldnt have no other kind but silk',
//      'Has it really got a team of snow white horses?' ] }

store.dispatch({
  type: 'DELETE_MESSAGE',
  index: 1
} as DeleteMessageAction);

console.log(store.getState());
// -> 
// { messages:
//    [ 'Would you say the fringe was made of silk?',
//      'Has it really got a team of snow white horses?' ] }

store.dispatch({
  type: 'DELETE_MESSAGE',
  index: 0
} as DeleteMessageAction);

console.log(store.getState());
// ->
// { messages: [ 'Has it really got a team of snow white horses?' ] }

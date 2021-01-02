import {
  Action,
  Reducer,
  Store
} from './lib/miniRedux';

interface AppState {
  messages: string[];
}

interface AddMessageAction extends Action {
  message: string;
}

interface DeleteMessageAction extends Action {
  index: number;
}

// Instead of creating the ADD_MESSAGE actions directly as objects, let’s create a function to do this for us
// we’ve created a class with two static methods addMessage and deleteMessage.
// They return an AddMessageAction and a DeleteMessageAction respectively.
// ---
// You definitely don’t have to use static methods for your action creators. You could use plain functions,
// functions in a namespace, even instance methods on an object, etc. The key idea is to keep them organized
// in a way that makes them easy to use.
class MessageActions {
  static addMessage(message: string): AddMessageAction {
    return {
      type: 'ADD_MESSAGE',
      message: message
    };
  }
  static deleteMessage(index: number): DeleteMessageAction {
    return {
      type: 'DELETE_MESSAGE',
      index: index
    };
  }
}

let reducer: Reducer<AppState> =
  (state: AppState, action: Action) => {
  switch (action.type) {
  case 'ADD_MESSAGE':
    return {
      messages: state.messages.concat((<AddMessageAction>action).message),
    };
  case 'DELETE_MESSAGE':
    let idx = (<DeleteMessageAction>action).index;
    return {
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

store.dispatch(
  MessageActions.addMessage('Would you say the fringe was made of silk?'));

store.dispatch(
  MessageActions.addMessage('Wouldnt have no other kind but silk'));

store.dispatch(
  MessageActions.addMessage('Has it really got a team of snow white horses?'));

console.log(store.getState());
// -> 
// { messages:
//    [ 'Would you say the fringe was made of silk?',
//      'Wouldnt have no other kind but silk',
//      'Has it really got a team of snow white horses?' ] }

store.dispatch( MessageActions.deleteMessage(1) );

console.log(store.getState());
// -> 
// { messages:
//    [ 'Would you say the fringe was made of silk?',
//      'Has it really got a team of snow white horses?' ] }

store.dispatch( MessageActions.deleteMessage(0) );

console.log(store.getState());
// ->
// { messages: [ 'Has it really got a team of snow white horses?' ] }

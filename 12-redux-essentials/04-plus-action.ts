interface Action {
  type: string;
  payload?: any;
}

interface Reducer<T> {
  (state: T, action: Action): T;
}

// But often changes in our app can’t be described by a single value
// - instead we need parameters to describe the change. This is why
// we have the payload field in our Action.
let reducer: Reducer<number> = (state: number, action: Action) => {
  switch (action.type) {
  case 'INCREMENT':
    return state + 1;
  case 'DECREMENT':
    return state - 1;
  case 'PLUS':
    return state + action.payload;
  default:
    return state;
  }
};

console.log( reducer(3, { type: 'PLUS', payload: 7}) );    // -> 10 
console.log( reducer(3, { type: 'PLUS', payload: 9000}) ); // -> 9003 
console.log( reducer(3, { type: 'PLUS', payload: -2}) );   // -> 1

interface Action {
  type: string;
  payload?: any;
}

interface Reducer<T> {
  (state: T, action: Action): T;
}

// Having your state changes centralized in one place can help a ton
// in maintaining your program, particularly because it’s easy to track
// down where the changes are happening when they’re all together.
// (Furthermore, you can easily locate what state changes as the result
// of any action because you can search your code for the token specified
// for that action’s type)
let reducer: Reducer<number> = (state: number, action: Action) => {
  switch (action.type) {
  case 'INCREMENT':
    return state + 1;
  case 'DECREMENT':
    return state - 1;
  // Notice that the default case of the switch returns the original state.
  // This ensures that if an unknown action is passed in, there’s no error
  // and we get the original state unchanged.
  default:
    return state; // <-- dont forget!
  }
};

let incrementAction: Action = { type: 'INCREMENT' };
console.log(reducer(0, incrementAction)); // -> 1
console.log(reducer(1, incrementAction)); // -> 2

let decrementAction: Action = { type: 'DECREMENT' };
console.log(reducer(100, decrementAction)); // -> 99

// any other action just returns the input state
let unknownAction: Action = { type: 'UNKNOWN' };
console.log(reducer(100, unknownAction)); // -> 100


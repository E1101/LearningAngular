interface Action {
  type: string;
  payload?: any;
}

interface Reducer<T> {
  (state: T, action: Action): T;
}

// using a single number for the state lets us focus on other issues for now!
// --
// Remember that in Redux we do not modify the state.
// Instead, we create actions which instruct the reducer on how to generate a new state.
let reducer: Reducer<number> = (state: number, action: Action) =>
{
  if (action.type === 'INCREMENT')
    return state + 1;

  if (action.type === 'DECREMENT')
    return state - 1;

  return state;
};

let incrementAction: Action = { type: 'INCREMENT' };

console.log( reducer(0, incrementAction )); // -> 1
console.log( reducer(1, incrementAction )); // -> 2

let decrementAction: Action = { type: 'DECREMENT' };

console.log( reducer(100, decrementAction )); // -> 99

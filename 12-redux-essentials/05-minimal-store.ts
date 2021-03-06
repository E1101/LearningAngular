interface Action {
  type: string;
  payload?: any;
}

interface Reducer<T> {
  (state: T, action: Action): T;
}

// Our reducers are pure functions, and do not change the world around them.
// The problem is, in our app, things do change. Specifically, our state
// changes and we need to keep the new state somewhere.
// --
// our Store is generically typed - we specify the type of the state with generic type T.
class Store<T>
{
  private _state: T;

  constructor(
    private reducer: Reducer<T>,
    initialState: T
  ) {
    this._state = initialState;
  }

  getState(): T {
    return this._state;
  }

  dispatch(action: Action): void {
    this._state = this.reducer(this._state, action);
  }
}

// same reducer as before
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

// create a new store
let store = new Store<number>(reducer, 0);
console.log(store.getState()); // -> 0

store.dispatch({ type: 'INCREMENT' });
console.log(store.getState()); // -> 1

store.dispatch({ type: 'INCREMENT' });
console.log(store.getState()); // -> 2

store.dispatch({ type: 'DECREMENT' });
console.log(store.getState()); // -> 1

interface Action {
  type: string;
  payload?: any;
}

interface Reducer<T> {
  (state: T, action: Action): T;
}

// Notice that this Reducer makes the generic type concrete to number by the syntax Reducer<number>.
// --
// It seems almost silly to have that as a code example,
// but it teaches us our first principle of reducers:
// "By default, reducers return the original state."
let reducer: Reducer<number> = (state: number, action: Action) => {
  return state;
};

console.log( reducer(0, null) ); // -> 0

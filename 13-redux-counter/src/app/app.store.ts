import { InjectionToken } from '@angular/core';
import {
  createStore,
  Store,
  compose,
  StoreEnhancer
} from 'redux';

import { AppState } from './app.state';
import { counterReducer as reducer } from './counter.reducer';

// we could create our store like so:
// let store: Store<AppState> = createStore<AppState>(counterReducer);

// However, one of the awesome things about Redux is that it has a robust
// set of developer tools. Specifically, there is a Chrome extension that
// will let us monitor the state of our application and dispatch actions.

// In order to use the Devtools we have to do one thing: add it to our store.
// ---
// Not everyone who uses our app will necessarily have the Redux Devtools
// installed. The code above will check for window.devToolsExtension, which
// is defined by Redux Devtools, and if it exists, we will use it. If it
// doesn’t exist, we’re just returning an identity function (f => f) that
// will return whatever is passed to it.
const devtools: StoreEnhancer<AppState> = window['devToolsExtension']
  ? window['devToolsExtension']()
  : f => f;

// In order to use this devtools we pass it as middleware to our Redux store:
// ---
// Middleware is a term for a function that enhances the functionality of
// another library. The Redux Devtools is one of many possible middleware
// libraries for Redux. Redux supports lots of interesting middleware and
// it’s easy to write our own.
// ---
// Now whenever we dispatch an action and change our state, we can inspect it in our browser!
export function createAppStore(): Store<AppState> {
  return createStore<AppState>(
    reducer,
    compose(devtools)
  );
}

// Here we have created a const AppStore which uses the InjectionToken
// class from Angular. InjectionToken is a better choice than injecting
// a string directly because it helps us avoid collisions.
// Now we can use this token AppStore with provide.
export const AppStore = new InjectionToken('App.store');

// we don’t want Angular to create our store, we did it ourselves
// above with createStore. We just want to use the store we’ve already created.
// --
// Note: Store is an interface, not a class and, unfortunately, we can’t use interfaces as a
// dependency injection key.
// This means we need to create our own token that we’ll use for injecting the store. Thankfully,
// Angular makes this easy to do. Let’s create this token in it’s own file so that way we can
// import it from anywhere in our application;
// If you’re interested in why we can’t use an interface as a DI key, it’s because TypeScript
// interfaces are removed after compilation and not available at runtime.
export const appStoreProviders = [
   { provide: AppStore, useFactory: createAppStore }
];

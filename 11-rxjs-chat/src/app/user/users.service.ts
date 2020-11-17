import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { User } from './user.model';


/**
 * UserService manages our current user
 *
 * The point of the UsersService is to provide a place where our application can
 * learn about the current user and also notify the rest of the application if
 * the current user changes.
 */
@Injectable()
export class UsersService
{
  // • We’re defining an instance variable currentUser which is a Subject stream.
  // • Concretely, currentUser is a BehaviorSubject which will contain User.
  // • However, the first value of this stream is null (the constructor argument).
  // --
  // One consequence of streams is that, because messages are published immediately,
  // a new subscriber risks missing the latest value of the stream.
  // BehaviourSubject84 has a special property in that it stores the last value.
  // Meaning that any subscriber to the stream will receive the latest value.
  // This is great for us because it means that any part of our application can subscribe
  // to the UsersSer- vice.currentUser stream and immediately know who the current user is.
  // --
  // You can think of a Subject as a “read/write” stream.
  // UsersService.currentUser.subscribe((newUser) => {
  //   console.log('New User is: ', newUser.name);
  // })
  currentUser: Subject<User> = new BehaviorSubject<User>(null);

  setCurrentUser(newUser: User): void
  {
    // we use the next method on a Subject to push a new value to the stream
    this.currentUser.next(newUser);
  }
}

export const userServiceInjectables: Array<any> = [
  UsersService
];

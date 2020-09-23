import { Component, OnInit } from '@angular/core';

import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-demo',
  templateUrl: './user-demo.component.html',
  styleUrls: ['./user-demo.component.css']
})
export class UserDemoComponent {
  userName: string;
  // removed `userService` because of constructor shorthand below

  // When we put the UserService on the constructor of the UserDemoComponent,
  // Angular knows what to inject (and how) **because we listed UserService in
  // the providers key of our NgModule.
  // We set it as a property with `private`.
  constructor(private userService: UserService) {
    // empty because we don't have to do anything else!
  }

  // below is the same...
  signIn(): void {
    // when we sign in, set the user
    // this mimics filling out a login form
    this.userService.setUser({
      name: 'Nate Murray'
    });

    // now **read** the user name from the service
    this.userName = this.userService.getUser().name;
    console.log('User name is: ', this.userName);
  }
}

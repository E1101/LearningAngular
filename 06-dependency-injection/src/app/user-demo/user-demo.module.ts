import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// imported here
import { UserService } from '../services/user.service';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    // This tells Angular that we want to provide a singleton instance
    // of UserService whenever UserService is injected.
    // then we can inject UserService into our component.
    // (!) Every class that injects the UserService will receive the same singleton.
    // -
    // is actually shorthand notation for the following, equivalent configuration:
    // providers: [{ provide: UserService, useClass: UserService }];
    UserService,
  ],
  declarations: []
})
export class UserDemoModule { }

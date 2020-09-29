import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

// This component will either show a login form, for the case when there -
// is no logged user, or display a little banner with user information -
// along with a logout link.

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent
{
  message: string;

  constructor(public authService: AuthService)
  {
    this.message = '';
  }

  login(username: string, password: string): boolean
  {
    this.message = '';
    if (! this.authService.login(username, password)) {
      this.message = 'Incorrect credentials.';
      setTimeout(function() {
        this.message = '';
      }.bind(this), 2500);
    }

    return false;
  }

  logout(): boolean
  {
    this.authService.logout();

    return false;
  }
}

import { Injectable } from '@angular/core';

@Injectable()
export class AuthService
{
  login(user: string, password: string): boolean
  {
    if (user === 'user' && password === 'password') {
      // If you’re not familiar, localStorage is an HTML5 provided key/value pair -
      // that allows you to persist information on the browser. The API is very simple,
      // and basically allows the setting, retrieval and deletion of items.
      localStorage.setItem('username', user);
      return true;
    }

    return false;
  }

  logout(): any
  {
    localStorage.removeItem('username');
  }

  getUser(): any
  {
    return localStorage.getItem('username');
  }

  isLoggedIn(): boolean
  {
    return this.getUser() !== null;
  }
}

export const AUTH_PROVIDERS: Array<any> = [
  { provide: AuthService, useClass: AuthService }
];

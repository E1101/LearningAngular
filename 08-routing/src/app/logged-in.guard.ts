import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from './auth.service';

// Angular CLI contains a generator for creating guards.
// So this file could be created with the command: ng generate guard logged-in

@Injectable()
export class LoggedInGuard
  implements CanActivate
{
  constructor(private authService: AuthService)
  { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean
  {
    return this.authService.isLoggedIn();
  }
}

import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthenticationService} from '../services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class LoggedOutGuard implements CanActivate {

  // tslint:disable-next-line:variable-name
  constructor(private _authService: AuthenticationService, private _router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const idToken = localStorage.getItem('access_token');
    if (!idToken || !this._authService.isLoggedIn()) {
      return true;
    }
    this._router.navigateByUrl('games');
    return false;
  }

}

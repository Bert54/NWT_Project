/* tslint:disable:variable-name */
import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, ActivatedRoute} from '@angular/router';
import {Observable, of, Subject} from 'rxjs';
import {AuthenticationService} from '../services/authentication.service';
import {VideoGamesService} from '../services/video-games.service';
import has = Reflect.has;
import {Game} from '../interfaces/Game';
import {catchError, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoggedInGameDetailsGuard implements CanActivate {


  constructor(private _authService: AuthenticationService, private _router: Router, private _vgService: VideoGamesService) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const idToken = localStorage.getItem('access_token');
    if (idToken && this._authService.isLoggedIn()) {
      const id = route.params.id;
      const subject = new Subject<boolean>();
      this._vgService.fetchOne(id).
      subscribe(
        _ => {
              subject.next(true);
            },
        _ => {
          this._router.navigateByUrl('games');
          subject.next(false);
        }
      );
      return subject.asObservable();
    }
    this._router.navigateByUrl('games');
    return false;
  }


}

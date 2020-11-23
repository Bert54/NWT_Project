/* tslint:disable:variable-name */
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { Moment } from 'moment';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Username } from '../interfaces/username';
import { User } from '../interfaces/User';
import { HttpRequestsService } from './http-requests.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private _isLoggedIn: boolean;
  private _userName: string;

  private readonly _backendURL: any;

  constructor(private _http: HttpRequestsService) {
    this._userName = 'NOT_LOGGED_IN';
  }

  public login(user: User): Observable<any> {
    return this._http.login(user).pipe(
      tap(res => {
        this.setSession(res);
      })
    );
  }

  public fetchLoginUserName(): Observable<Username> {
    return this._http.fetchLoginUserName();
  }

  public createUser(user: User): Observable<any> {
    return this._http.createUser(user);
  }

  public refreshSessionStatus(): void {
    const idToken = localStorage.getItem('access_token');
    if (idToken && this.isLoggedIn()) {
      this.fetchLoginUserName()
        .subscribe(res => {
        this._userName = res.username;
        this._isLoggedIn = true;
      });
    }
    else {
      this._isLoggedIn = false;
    }
  }

  private setSession(authResult): void {
    const expiresAt = moment().add(259200, 'second');
    localStorage.setItem('access_token', authResult.access_token);
    localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()) );
    this._isLoggedIn = true;
  }

  logout(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('expires_at');
    this._isLoggedIn = false;
  }

  public isLoggedIn(): boolean {
    return moment().isBefore(this.getExpiration());
  }

  isLoggedOut(): boolean {
    return !this.isLoggedIn();
  }

  getExpiration(): Moment {
    const expiration = localStorage.getItem('expires_at');
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
  }

  get isLoggedInStatus(): boolean {
    return this._isLoggedIn;
  }

  get userName(): string {
    return this._userName;
  }

}

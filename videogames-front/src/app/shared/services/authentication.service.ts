import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from '../../../environments/environment';
import * as moment from 'moment';
import { Moment } from 'moment';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {Username} from '../interfaces/username';
import {User} from '../interfaces/User';
import {Game} from '../interfaces/Game';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  // tslint:disable-next-line:variable-name
  private _isLoggedIn: boolean;
  // tslint:disable-next-line:variable-name
  private _userName: string;

  // tslint:disable-next-line:variable-name
  private readonly _backendURL: any;

  // tslint:disable-next-line:variable-name
  constructor(private _http: HttpClient) {
    this._backendURL = {};
    let baseUrl = `${environment.backend.protocol}://${environment.backend.host}`;
    if (environment.backend.port) {
      baseUrl += `:${environment.backend.port}`;
    }
    Object.keys(environment.backend.endpoints).forEach(k => this._backendURL[ k ] = `${baseUrl}${environment.backend.endpoints[ k ]}`);
    this._userName = 'NOT_LOGGED_IN';
  }

  // tslint:disable-next-line:typedef
  public login(user: User): Observable<any> {
    return this._http.post(this._backendURL.login, user, this._options()).pipe(
      tap(res => {
        this.setSession(res);
      })
    );
  }

  public fetchLoginUserName(): Observable<Username> {
    return this._http.get<Username>(this._backendURL.usersProfile);
  }

  public createUser(user: User): Observable<any> {
    return this._http.post<Game>(this._backendURL.users, user, this._options());
  }

  private _options(headerList: object = {}): any {
    return { headers: new HttpHeaders(Object.assign({ 'Content-Type': 'application/json' }, headerList)) };
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

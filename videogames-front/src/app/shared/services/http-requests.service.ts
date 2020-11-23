/* tslint:disable:variable-name */
import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';
import {Game} from '../interfaces/Game';
import {defaultIfEmpty, filter, map, tap} from 'rxjs/operators';
import {User} from '../interfaces/User';
import {Username} from '../interfaces/username';

@Injectable({
  providedIn: 'root'
})
export class HttpRequestsService {

  private readonly _backendURL: any;

  constructor(private _http: HttpClient) {

    this._backendURL = {};


    let baseUrl = `${environment.backend.protocol}://${environment.backend.host}`;
    if (environment.backend.port) {
      baseUrl += `:${environment.backend.port}`;
    }
    Object.keys(environment.backend.endpoints).forEach(k => this._backendURL[ k ] = `${baseUrl}${environment.backend.endpoints[ k ]}`);
  }

  fetch(): Observable<Game[]> {
    return this._http.get<Game[]>(this._backendURL.allGames)
      .pipe(
        filter(_ => !!_),
        defaultIfEmpty([])
      );
  }

  fetchOne(id: string): Observable<Game> {
    return this._http.get<Game>(this._backendURL.singleGame.replace(':id', id));
  }

  create(game: Game): Observable<any> {
    return this._http.post<Game>(this._backendURL.allGames, game, this._options());
  }

  delete(id: string): Observable<string> {
    return this._http.delete<void>(this._backendURL.singleGame.replace(':id', id))
      .pipe(
        map(_ => id)
      );
  }

  update(id: string, game: Game): Observable<any> {
    return this._http.put<Game>(this._backendURL.singleGame.replace(':id', id), game, this._options());
  }

  public login(user: User): Observable<any> {
    return this._http.post(this._backendURL.login, user, this._options());
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

}

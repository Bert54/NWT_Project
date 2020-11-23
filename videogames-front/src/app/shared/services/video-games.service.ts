/* tslint:disable:variable-name */
import { Injectable } from '@angular/core';
import { Game } from '../interfaces/Game';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable, of } from 'rxjs';
import {defaultIfEmpty, filter, map} from 'rxjs/operators';
import {HttpRequestsService} from './http-requests.service';

@Injectable({
  providedIn: 'root'
})

export class VideoGamesService {

  constructor(private _http: HttpRequestsService) {
  }

  fetch(): Observable<Game[]> {
    return this._http.fetch();
  }

  fetchOne(id: string): Observable<Game> {
    return this._http.fetchOne(id);
  }

  create(game: Game): Observable<any> {
    return this._http.create(game);
  }

  delete(id: string): Observable<string> {
    return this._http.delete(id);
  }

  update(id: string, game: Game): Observable<any> {
    return this._http.update(id, game);
  }

}

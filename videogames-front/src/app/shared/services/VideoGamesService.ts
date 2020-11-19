import { Injectable } from '@angular/core';
import { Game } from '../interfaces/Game';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable, of } from 'rxjs';
import { defaultIfEmpty, filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class VideoGamesService {

  // tslint:disable-next-line:variable-name
  private readonly _backendURL: any;
  // tslint:disable-next-line:variable-name
  private _games: Game[];

  // tslint:disable-next-line:variable-name
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


}

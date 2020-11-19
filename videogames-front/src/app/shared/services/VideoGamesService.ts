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

  constructor(private http: HttpClient) {

    this._games = [{
      name: 'Far Cry 5',
      cover: 'https://www-konga-com-res.cloudinary.com/w_auto,f_auto,fl_lossy,dpr_auto,q_auto/media/catalog/product/C/H/56261_1535284972.jpg',
      genre: 'FPS',
      platform: 'PC',
      description: 'Far Cry 5 is a 2018 first-person shooter game developed by Ubisoft Montreal and Ubisoft Toronto and published by Ubisoft. It is the fifth main installment in the Far Cry series. The game takes place in Hope County, a fictional region of Montana, United States. The main story revolves around the Project at Eden\'s Gate, a doomsday cult that has taken over the county at the command of its charismatic and powerful leader, Joseph Seed.'
    }, {
      name: 'Pokémon Sword',
      cover: 'https://s2.gaming-cdn.com/images/products/4075/orig/pokemon-sword-switch-cover.jpg',
      genre: 'RPG',
      platform: 'Switch',
      description: 'Pokémon Sword is a 2019 role-playing video games developed by Game Freak and published by The Pokémon Company and Nintendo for the Nintendo Switch. Like previous installments, they chronicle the journey of a young Pokémon trainer aiming to become the Pokémon Champion, this time in the new Galar region, which is based on the United Kingdom. The main objective of the games is to dethrone the Pokémon League Champion, Leon, in a tournament that various other Gym Leaders and rivals also take part in, whilst dealing with Team Yell and a nefarious conspiracy within the League. Sword and Shield introduce 81 new Pokémon alongside 13 regional variants of pre-existing Pokémon; Dynamaxing, which increases the size of Pokémon under certain conditions; Gigantamaxing, which additionally changes the form of certain Pokémon; and the Wild Area, which is a large, open-world area with free camera movement that contains co-op raid battles. The two games also reintroduce features previously seen in Sun and Moon and Let\'s Go, Pikachu! and Let\'s Go, Eevee!, such as regional variants and roaming Pokémon depicted in the overworld.'
    }
    ];

    this._backendURL = {};


    let baseUrl = `${environment.backend.protocol}://${environment.backend.host}`;
    if (environment.backend.port) {
      baseUrl += `:${environment.backend.port}`;
    }
    Object.keys(environment.backend.endpoints).forEach(k => this._backendURL[ k ] = `${baseUrl}${environment.backend.endpoints[ k ]}`);
  }

  fetch(): Observable<Game[]> {
    return of(this._games)
      .pipe(
        filter(_ => !!_),
        defaultIfEmpty([])
      );
  }


}

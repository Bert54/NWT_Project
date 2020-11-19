import { Component, OnInit } from '@angular/core';
import {Game} from '../shared/interfaces/Game';
import {VideoGamesService} from '../shared/services/VideoGamesService';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'video-game-list',
  templateUrl: './video-game-list.component.html',
  styleUrls: ['./video-game-list.component.css']
})
export class VideoGameListComponent implements OnInit {

  // tslint:disable-next-line:variable-name
  private _games: Game[];

  // tslint:disable-next-line:variable-name
  constructor(private _vgService: VideoGamesService) {
    this._games = [];
  }

  get games(): Game[] {
    return this._games;
  }

  ngOnInit(): void {
    this._vgService.fetch().subscribe((games: Game[]) => this._games = games);
  }

}

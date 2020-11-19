import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Game } from '../shared/interfaces/Game';
import { VideoGamesService } from '../shared/services/VideoGamesService';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'video-game-details',
  templateUrl: './video-game-details.component.html',
  styleUrls: ['./video-game-details.component.css']
})
export class VideoGameDetailsComponent implements OnInit {

  // tslint:disable-next-line:variable-name
  private _game: Game;

  // tslint:disable-next-line:variable-name
  constructor(private _route: ActivatedRoute, private _vgService: VideoGamesService) {
    this._game = {} as Game;
  }

  ngOnInit(): void {
    this._route.paramMap.subscribe(params => {
      const id = params.get('id');
      this._vgService.fetchOne(id).subscribe((game: Game) => this._game = game);
    });
  }

  public get game(): Game {
    return this._game;
  }

}

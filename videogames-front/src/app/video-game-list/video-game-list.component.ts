import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Game} from '../shared/interfaces/Game';
import {VideoGamesService} from '../shared/services/VideoGamesService';
import {Router} from '@angular/router';
import {PageEvent} from '@angular/material/paginator';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'video-game-list',
  templateUrl: './video-game-list.component.html',
  styleUrls: ['./video-game-list.component.scss']
})
export class VideoGameListComponent implements OnInit {

  // tslint:disable-next-line:variable-name
  _pageSize;
  // tslint:disable-next-line:variable-name
  _currentPage;
  // tslint:disable-next-line:variable-name
  _pageEvent: PageEvent;

  // tslint:disable-next-line:variable-name
  private _games: Game[];
  // tslint:disable-next-line:variable-name
  private _displayedGames: Game[];

  // tslint:disable-next-line:variable-name
  constructor(private _vgService: VideoGamesService, private _router: Router) {
    this._games = [];
    this._displayedGames = [];
    this._pageSize = 10;
    this._currentPage = 0;
  }

  get games(): Game[] {
    return this._games;
  }

  get displayedGames(): Game[] {
    return this._displayedGames;
  }

  get pageSize(): number {
    return this._pageSize;
  }

  get currentPage(): number {
    return this._currentPage;
  }

  private updateDisplayedPages(): void {
    this._displayedGames = [];
    if ((this._currentPage + 1) * this.pageSize >= this._games.length) {;
      for (let i = this._currentPage * this._pageSize ; i < this._games.length ; i++) {
        this._displayedGames.push(this._games[i]);
      }
    }
    else {
      for (let i = this._currentPage * this._pageSize ; i < (this._currentPage + 1) * this._pageSize ; i++) {
        this._displayedGames.push(this._games[i]);
      }
    }
  }

  ngOnInit(): void {
    this._vgService.fetch().subscribe((games: Game[]) => {
      this._games = games;
      this.updateDisplayedPages();
    });
  }


  goToGame(id: string): void {
    this._router.navigate([ 'games', id ]);
  }

  switchDisplayedGamed(event?: PageEvent): any {
    this._currentPage = event.pageIndex;
    this._pageSize = event.pageSize;
    this.updateDisplayedPages();
    return 1;
  }
}

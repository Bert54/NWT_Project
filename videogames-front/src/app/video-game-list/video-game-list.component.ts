import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Game} from '../shared/interfaces/Game';
import {VideoGamesService} from '../shared/services/VideoGamesService';
import {Router} from '@angular/router';
import {PageEvent} from '@angular/material/paginator';
import {Sort} from '@angular/material/sort';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'video-game-list',
  templateUrl: './video-game-list.component.html',
  styleUrls: ['./video-game-list.component.scss']
})
export class VideoGameListComponent implements OnInit {

  // tslint:disable-next-line:variable-name
  _pageSize: any;
  // tslint:disable-next-line:variable-name
  _currentPage: any;
  // tslint:disable-next-line:variable-name
  _pageEvent: PageEvent;
  // tslint:disable-next-line:variable-name
  private _displayDeleteButtons: boolean[];
  // tslint:disable-next-line:variable-name
  private _games: Game[];
  // tslint:disable-next-line:variable-name
  private _displayedGames: Game[];
  // tslint:disable-next-line:variable-name
  private _isSearchMenuShown;
  // tslint:disable-next-line:variable-name
  _searchNameValue: any;
  // tslint:disable-next-line:variable-name
  _searchGenreValue: any;
  // tslint:disable-next-line:variable-name
  _searchPlatformValue: any;

  // tslint:disable-next-line:variable-name
  constructor(private _vgService: VideoGamesService, private _router: Router) {
    this._games = [];
    this._displayedGames = [];
    this._pageSize = 10;
    this._currentPage = 0;
    this._isSearchMenuShown = false;
    this._searchNameValue = '';
    this._searchGenreValue = '';
    this._searchPlatformValue = '';
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

  get displayDeleteButtons(): boolean[] {
    return this._displayDeleteButtons;
  }

  get isSearchMenuShown(): boolean {
    return this._isSearchMenuShown;
  }

  get searchNameValue(): boolean {
    return this._searchNameValue;
  }

  get searchGenreValue(): boolean {
    return this._searchGenreValue;
  }

  get searchPlatformValue(): boolean {
    return this._searchPlatformValue;
  }

  setSearchNameValue(newValue: string): void {
    this._searchNameValue = newValue;
  }

  setSearchGenreValue(newValue: string): void {
    this._searchGenreValue = newValue;
  }

  setSearchPlatformValue(newValue: string): void {
    this._searchPlatformValue = newValue;
  }

  private updateDisplayedPages(): void {
    this._displayedGames = [];
    if ((this._currentPage + 1) * this.pageSize >= this._games.length) {
      for (let i = this._currentPage * this._pageSize ; i < this._games.length ; i++) {
        this._displayedGames.push(this._games[i]);
      }
    }
    else {
      for (let i = this._currentPage * this._pageSize ; i < (this._currentPage + 1) * this._pageSize ; i++) {
        this._displayedGames.push(this._games[i]);
      }
    }
    this._displayDeleteButtons = [];
    for (let i = 0 ; i < this._pageSize ; i++) {
      this._displayDeleteButtons.push(false);
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
  }

  toggleSearchMenu(): void {
    this._isSearchMenuShown = !this._isSearchMenuShown;
  }

  sortGameList(sort: Sort): any {
    let sortedData: Game[];
    const data = this._games.slice();
    if (!sort.active || sort.direction === '') {
      sortedData = data;
      this._games = sortedData;
      this.updateDisplayedPages();
      return;
    }

    sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'name': return this.compare(a.name, b.name, isAsc);
        case 'genre': return this.compare(a.genre, b.genre, isAsc);
        case 'platform': return this.compare(a.platform, b.platform, isAsc);
        default: return 0;
      }
    });
    this._games = sortedData;
    this.updateDisplayedPages();
  }

  compare(a: number | string, b: number | string, isAsc: boolean): any {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }
}

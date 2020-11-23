/* tslint:disable:variable-name */
import { Component, OnInit } from '@angular/core';
import { Game } from '../shared/interfaces/Game';
import { VideoGamesService } from '../shared/services/video-games.service';
import { Router } from '@angular/router';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { GameDialogComponent } from '../shared/game-dialog/game-dialog.component';
import { filter, map, mergeMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { DeleteDialogComponent } from '../shared/delete-dialog/delete-dialog.component';
import { AuthenticationService } from '../shared/services/authentication.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'video-game-list',
  templateUrl: './video-game-list.component.html',
  styleUrls: ['./video-game-list.component.scss']
})
export class VideoGameListComponent implements OnInit {

  _actionbuttonHover: boolean;

  _pageSize: any;
  _currentPage: any;
  _pageEvent: PageEvent;
  private _displayButtons: boolean[];
  private _games: Game[];
  private _filteredGames: Game[];
  private _displayedGames: Game[];
  private _isSearchMenuShown;
  _searchNameValue: any;
  _searchGenreValue: any;
  _searchPlatformValue: any;

  private _gamesDialog: MatDialogRef<GameDialogComponent>;

  private _confirmDialog: MatDialogRef<DeleteDialogComponent>;

  private _gameListElementDisabledRipple: boolean;

  private _isLoggedIn: boolean;

  // tslint:disable-next-line:max-line-length
  constructor(private _vgService: VideoGamesService, private _router: Router, private _dialog: MatDialog, private _authService: AuthenticationService) {
    this._games = [];
    this._filteredGames = [];
    this._displayedGames = [];
    this._pageSize = 10;
    this._currentPage = 0;
    this._isSearchMenuShown = false;
    this._searchNameValue = '';
    this._searchGenreValue = '';
    this._searchPlatformValue = '';
    this._actionbuttonHover = false;
    this._gameListElementDisabledRipple = false;
  }

  ngOnInit(): void {
    this._vgService.fetch().subscribe((games: Game[]) => {
      this._games = games;
      this._filteredGames = games;
      this.updateDisplayedPages();
    });
    this._authService.refreshSessionStatus();
  }

  get games(): Game[] {
    return this._games;
  }

  get filteredGames(): Game[] {
    return this._filteredGames;
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

  get displayButtons(): boolean[] {
    return this._displayButtons;
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

  get actionButtonHover(): boolean {
    return this._actionbuttonHover;
  }

  get gameListElementEnabledRipple(): boolean {
    return this._gameListElementDisabledRipple;
  }

  get isLoggedIn(): boolean {
    return this._authService.isLoggedInStatus;
  }

  setSearchNameValue(newValue: string): void {
    this._searchNameValue = newValue;
    this.filterGames();
  }

  setSearchGenreValue(newValue: string): void {
    this._searchGenreValue = newValue;
    this.filterGames();
  }

  setSearchPlatformValue(newValue: string): void {
    this._searchPlatformValue = newValue;
    this.filterGames();
  }

  setActionButtonHover(isHovering: boolean): void {
    this._actionbuttonHover = isHovering;
    this._gameListElementDisabledRipple = isHovering;
  }

  private updateDisplayedPages(): void {
    this._displayedGames = [];
    if ((this._currentPage + 1) * this.pageSize >= this._filteredGames.length) {
      for (let i = this._currentPage * this._pageSize ; i < this._filteredGames.length ; i++) {
        this._displayedGames.push(this._filteredGames[i]);
      }
    }
    else {
      for (let i = this._currentPage * this._pageSize ; i < (this._currentPage + 1) * this._pageSize ; i++) {
        this._displayedGames.push(this._filteredGames[i]);
      }
    }
    this._displayButtons = [];
    for (let i = 0 ; i < this._pageSize ; i++) {
      this._displayButtons.push(false);
    }
  }

  goToGame(id: string): void {
    if (!this._actionbuttonHover) {
      this._router.navigate(['games', id]);
    }
  }

  switchDisplayedGamed(event?: PageEvent): any {
    this._currentPage = event.pageIndex;
    this._pageSize = event.pageSize;
    this.updateDisplayedPages();
  }

  toggleSearchMenu(): void {
    this._isSearchMenuShown = !this._isSearchMenuShown;
  }

  filterGames(): void {
    this._currentPage = 0;
    this._filteredGames = [];
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0 ; i < this._games.length ; i++) {
      const curGame: Game = this._games[i];
      let addToDisplayList = true;
      if (!this._searchNameValue.isEmpty) {
        if (!curGame.name.toLowerCase().includes(this._searchNameValue.toLowerCase())) {
          addToDisplayList = false;
        }
      }
      if (!this._searchGenreValue.isEmpty) {
        if (addToDisplayList && !curGame.genre.toLowerCase().includes(this._searchGenreValue.toLowerCase())) {
          addToDisplayList = false;
        }
      }
      if (!this._searchPlatformValue.isEmpty) {
        if (addToDisplayList && !curGame.platform.toLowerCase().includes(this._searchPlatformValue.toLowerCase())) {
          addToDisplayList = false;
        }
      }
      if (addToDisplayList) {
        this._filteredGames.push(curGame);
      }
    }
    this.updateDisplayedPages();
  }

  sortGameList(sort: Sort): any {
    let sortedData: Game[];
    const data = this._filteredGames.slice();
    if (!sort.active || sort.direction === '') {
      sortedData = data;
      this._filteredGames = sortedData;
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
    this._filteredGames = sortedData;
    this.updateDisplayedPages();
  }

  compare(a: number | string, b: number | string, isAsc: boolean): any {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  showGameDialog(): void {
    this._gamesDialog = this._dialog.open(GameDialogComponent, {
      width: '500px',
      height: '670px',
      disableClose: true,
    });
    this._gamesDialog.afterClosed()
      .pipe(
        filter(_ => !!_),
        map((_: Game) => {
          delete _.id;
          return _;
        }),
        mergeMap(_ => this._add(_))
      )
      .subscribe(
        (games: Game[]) => {
          this._games = games;
          this.filterGames();
        });
  }

  public openConfirmDialog(id: string): void {
    this._confirmDialog = this._dialog.open(DeleteDialogComponent, {
      width: '350px',
      height: '125px',
      disableClose: true,
      data: {
        id,
      }
    });
    this._confirmDialog.afterClosed()
      .subscribe(
        (result: boolean) => {
          if (result) {
            this._vgService.delete(id).subscribe(_ => {
              this._vgService.fetch().subscribe((games: Game[]) => {
                this._games = games;
                this._filteredGames = games;
                this.updateDisplayedPages();
              });
            });
          }
        }
      );
  }

  public showEditDialog(game: Game): void {
    this._gamesDialog = this._dialog.open(GameDialogComponent, {
      width: '500px',
      height: '670px',
      disableClose: true,
      data: game
    });

    this._gamesDialog.afterClosed()
      .pipe(
        filter(_ => !!_),
        map((_: Game) => {
          const id = _.id;
          delete _.id;
          return { id, update: _ };
        }),
        mergeMap(_ => this._vgService.update(_.id, _.update))
      )
      .subscribe(_ => {
        this._vgService.fetch().subscribe((games: Game[]) => {
          this._games = games;
          this._filteredGames = games;
          this.updateDisplayedPages();
        });
      });
  }

  private _add(game: Game): Observable<Game[]> {
    return this._vgService
      .create(game)
      .pipe(
        mergeMap(_ => this._vgService.fetch())
      );
  }
}

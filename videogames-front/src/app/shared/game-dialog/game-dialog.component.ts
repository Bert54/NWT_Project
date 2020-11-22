import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Game } from '../interfaces/Game';

@Component({
  selector: 'app-game-dialog',
  templateUrl: './game-dialog.component.html',
  styleUrls: ['./game-dialog.component.scss']
})
export class GameDialogComponent implements OnInit {

  // tslint:disable-next-line:variable-name
  constructor(private _dialogRef: MatDialogRef<GameDialogComponent>, @Optional() @Inject(MAT_DIALOG_DATA) private _game: Game) { }

  ngOnInit(): void {
  }

  get game(): Game {
    return this._game;
  }

  onCancel(): void {
    this._dialogRef.close();
  }

  onSave(game: Game): void {
    this._dialogRef.close(game);
  }

}

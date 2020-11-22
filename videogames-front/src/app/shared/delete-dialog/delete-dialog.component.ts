import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Game } from '../interfaces/Game';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.scss']
})
export class DeleteDialogComponent implements OnInit {


  // tslint:disable-next-line:variable-name
  private _id: number;

  // tslint:disable-next-line:variable-name
  constructor(private _dialogRef: MatDialogRef<DeleteDialogComponent>, @Inject(MAT_DIALOG_DATA) private readonly id: number) {
    this._id = id;
  }

  ngOnInit(): void {
  }

  onCancel(): void {
    this._dialogRef.close(false);
  }

  onConfirm(): void {
    this._dialogRef.close(true);
  }

}

import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {Game} from '../interfaces/Game';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-game-form',
  templateUrl: './game-form.component.html',
  styleUrls: ['./game-form.component.scss']
})

export class GameFormComponent implements OnInit, OnChanges {

  // tslint:disable-next-line:variable-name
  private _isUpdateMode: boolean;
  // tslint:disable-next-line:variable-name
  private _model: Game;
  // tslint:disable-next-line:variable-name
  private readonly _cancel$: EventEmitter<void>;
  // tslint:disable-next-line:variable-name
  private readonly _submit$: EventEmitter<Game>;
  // tslint:disable-next-line:variable-name
  private readonly _form: FormGroup;

  // tslint:disable-next-line:variable-name
  private _displayedCover: string;

  /**
   * Component constructor
   */
  constructor() {
    this._submit$ = new EventEmitter<Game>();
    this._cancel$ = new EventEmitter<void>();
    this._form = this.buildForm();
    this._displayedCover = '../../assets/images/no_picture.jpg';
  }

  ngOnInit(): void {
  }

  ngOnChanges(record): void {
    if (record.model && record.model.currentValue) {
      this._model = record.model.currentValue;
      this._isUpdateMode = true;
      this._displayedCover = this._model.cover;
    } else {
      this._model = {
        id: '',
        name: '',
        cover: '',
        genre: '',
        platform: '',
        description: ''
      };
      this._displayedCover = '../../assets/images/no_picture.jpg';
      this._isUpdateMode = false;
    }
    this._form.patchValue(this._model);
  }

  @Input()
  set model(model: Game) {
    this._model = model;
  }

  get model(): Game {
    return this._model;
  }

  get form(): FormGroup {
    return this._form;
  }

  get isUpdateMode(): boolean {
    return this._isUpdateMode;
  }

  get displayedCover(): string {
    return this._displayedCover;
  }

  @Output('cancel')
  get cancel$(): EventEmitter<void> {
    return this._cancel$;
  }

  /**
   * Returns private property _submit$
   */
  @Output('submit')
  get submit$(): EventEmitter<Game> {
    return this._submit$;
  }

  /**
   * Function to emit event to cancel process
   */
  cancel(): void {
    this._cancel$.emit();
  }

  /**
   * Function to emit event to submit form and person
   */
  submit(game: Game): void {
    this._submit$.emit(game);
  }

  private buildForm(): FormGroup {
    return new FormGroup({
      id: new FormControl(),
      name: new FormControl('', Validators.compose([
        Validators.required, Validators.minLength(1)
      ])),
      cover: new FormControl('', Validators.pattern('^(http|https):\/\/.*\.(png|jpg|jpeg|gif|svg)$')),
      genre: new FormControl('', Validators.required),
      platform: new FormControl('', Validators.required),
      description: new FormControl()
    });
  }

  public setDefaultCover(): void {
    this._displayedCover = '../../assets/images/no_picture.jpg';
  }

  public updateCover(): void {
    this._displayedCover = this.form.get('cover').value;
  }

}

import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthenticationService} from '../shared/services/authentication.service';
import {User} from '../shared/interfaces/User';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  // tslint:disable-next-line:variable-name
  private readonly _form: FormGroup;
  // tslint:disable-next-line:variable-name
  private _hasError = false;
  // tslint:disable-next-line:variable-name
  private _errorContent: string;
  // tslint:disable-next-line:variable-name
  private _hide = true;

  // tslint:disable-next-line:variable-name
  constructor(private _authService: AuthenticationService, private _router: Router) {
    this._form = this.buildForm();
  }

  ngOnInit(): void {
  }

  get form(): FormGroup {
    return this._form;
  }

  private buildForm(): FormGroup {
    return new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  get hide(): boolean {
    return this._hide;
  }

  set hide(value: boolean) {
    this._hide = value;
  }

  get hasError(): boolean {
    return this._hasError;
  }

  get errorContent(): string {
    return this._errorContent;
  }

  public login(formValues: any): void {
    if (formValues.username && formValues.password) {
      const user: User = {
        username: formValues.username,
        password: formValues.password
      };
      this._authService.login(user)
        .subscribe(
          _ => {
            this._router.navigateByUrl('/');
          },
          err => {
            this._hasError = true;
            if (err.status === 404){
              this._errorContent = 'User was not found';
              console.log(err);
            }else if (err.status === 401){
              this._errorContent = 'Wrong password';
              console.log(err);
            }else{
              this._errorContent = err.status + ' : ' + err.message;
            }
          }
        );
    }
  }



}

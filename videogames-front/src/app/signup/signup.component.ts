import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import { AuthenticationService } from '../shared/services/authentication.service';
import { Router } from '@angular/router';
import { User } from '../shared/interfaces/User';
import {MatchValidators} from '../shared/validators/MatchValidators';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  // tslint:disable-next-line:variable-name
  private readonly _form: FormGroup;

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
      password: new FormControl('', Validators.required),
      cpassword: new FormControl('', Validators.required)
    },
      {
        validators: MatchValidators.mustMatch
      });
  }

  public signup(formValues: any): void {
    if (formValues.username && formValues.password) {
      const user: User = {
        username: formValues.username,
        password: formValues.password
      };
      this._authService.createUser(user)
        .subscribe(
          _ => {
            this._router.navigateByUrl('/');
          }
        );
    }
  }

}

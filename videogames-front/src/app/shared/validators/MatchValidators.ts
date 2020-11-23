import { AbstractControl } from '@angular/forms';

export class MatchValidators {

  static mustMatch(c: AbstractControl): { notSame: boolean } | null {
    if (c.get('password').value !== c.get('cpassword').value) {
      return { notSame: true };
    }
    return null;
  }

}

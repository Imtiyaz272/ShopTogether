import { AbstractControl, AsyncValidatorFn } from "@angular/forms";
import { AuthService } from "../services/auth.service";
import {of } from "rxjs";
import { catchError, map } from 'rxjs/operators';

export function uniqueUsernameValidator(authService:AuthService): AsyncValidatorFn {
    return (control: AbstractControl) => {
        if (!control.value) {
            return of(null); // Return null if control value is empty
          }

          return authService.checkUsernameService(control.value).pipe(
            map((result) => (result.usernameTaken ? { usernameTaken: true } : null)),
            catchError(() => of(null))
          );
    }
}

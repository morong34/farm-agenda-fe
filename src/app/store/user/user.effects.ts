import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { IUser, UserService } from '../../shared/services/user.service';
import { UserError, UserLoaded, UserRequested } from './user.actions';
import { catchError, map, mergeMap, of } from 'rxjs';

@Injectable()
export class UserEffects {
  constructor(
    private actions$: Actions,
    private userService: UserService
  ) {}

  userRequested$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserRequested),
      mergeMap(() => {
        return this.userService.currentUser().pipe(
          map((user: IUser) => UserLoaded({ user })),
          catchError(err => of(UserError(err)))
        );
      })
    );
  });
}

import { WordsService } from '../../../core/services/words.service';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError } from 'rxjs/operators';

import {
  LOAD_WORDS,
  LoadWordsSuccess,
  ADD_WORD,
  AddWord,
  AddWordSuccess,
  DELETE_WORD,
  LoadWordsFail,
  LOAD_WORDS_FAIL,
  DeleteWord,
  DeleteManyWords,
  DELETE_MANY_WORDS,
  DeleteWordSuccess,
  EDIT_WORD,
  EditWord,
  EditWordSuccess,
  LoadWords,
  DeleteManyWordsSuccess
} from '../actions/words.actions';
import { Observable, of } from 'rxjs';
import { UserSignOut } from 'src/app/authentication/state/user.actions';

@Injectable()
export class WordsEffects {
  constructor(private actions$: Actions, private wordsService: WordsService) {}

  @Effect()
  getWords$ = this.actions$.pipe(
    ofType(LOAD_WORDS),
    switchMap((action: LoadWords) => {
      // console.log('LOAD WORDS', action.payload);
      return this.wordsService.getWords(action.payload).pipe(
        map((words: any) => new LoadWordsSuccess(words.data)),
        catchError(error => of(new LoadWordsFail(error)))
      );
    })
  );

  // @Effect()
  // getWordsFail$ = this.actions$.ofType(LOAD_WORDS_FAIL).pipe(
  //   switchMap(() => {
  //     console.log('LOAD WORDS FAIL');
  //     return this.wordsService.getWords().pipe(
  //       map(() => new UserSignOut())
  //       // catchError(error => of(new LoadWordsFail(error)))
  //     );
  //   })
  // );

  @Effect()
  addWord$ = this.actions$.pipe(
    ofType(ADD_WORD),
    switchMap((action: AddWord) => {
      // console.log('ADD WORD EFFECT', action.payload);
      return this.wordsService.addWord(action.payload).pipe(
        map(word => new AddWordSuccess(word))
        // catchError(error => new LoadWordsFail(error))
      );
    })
  );

  @Effect()
  deleteManyWords$: Observable<any> = this.actions$.pipe(
    ofType(DELETE_MANY_WORDS),
    switchMap((action: DeleteManyWords) => {
      // console.log('action.payload', action.payload);
      return this.wordsService.deleteManyWords(action.payload).pipe(
        map(words => {
          // console.log('words:', words);
          return new DeleteManyWordsSuccess(words);
        })
      );
    })
  );

  @Effect()
  deleteWord$: Observable<any> = this.actions$.pipe(
    ofType(DELETE_WORD),
    switchMap((action: DeleteWord) => {
      console.log('DELETE WORD EFFECT', action.payload);
      return this.wordsService
        .deleteWord(action.payload._id)
        .pipe(map(res => new DeleteWordSuccess(res.wordID)));
    })
  );

  @Effect()
  editWord$: Observable<any> = this.actions$.pipe(
    ofType(EDIT_WORD),
    switchMap((action: EditWord) => {
      console.log('EDIT WORD EFFECT', action.payload);
      return this.wordsService
        .updateWord(action.payload.wordData, action.payload.overwrite)
        .pipe(
          map(res => {
            console.log('res editWord EFFECT', res.data);
            return new EditWordSuccess(res.data);
          })
        );
    })
  );
}

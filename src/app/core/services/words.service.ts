import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable()
export class WordsService {
  constructor(private http: HttpClient) {}

  getWords(payload): Observable<any> {
    // console.log('payload GET WORDS SERVICE:', payload);
    const sortOrder = payload.sortOrder;
    const pageNumber = payload.pageNumber;
    const pageSize = payload.pageSize;
    // console.log('GET WORDS SERVICE', sortOrder, pageNumber, pageSize);
    return this.http.get<any>(`${environment.API_URL}/word/`, {
      params: new HttpParams()
        // .set('filter', filter)
        .set('sortOrder', sortOrder)
        .set('pageNumber', pageNumber.toString())
        .set('pageSize', pageSize.toString())
    });
  }

  getWord(id): Observable<any> {
    // console.log(id);
    return this.http.get<any>(`${environment.API_URL}/word/${id}`);
  }

  searchWord(searchString): Observable<any> {
    // console.log(id);
    return this.http.get<any>(
      `${environment.API_URL}/word/search/${searchString}`
    );
  }

  getWordContext(id): Observable<any> {
    // console.log(id);
    return this.http.get<any>(`${environment.API_URL}/context/${id}`);
  }

  addWord(word): Observable<any> {
    // console.log('ADD WORD SERVICE', word);
    return this.http.post<any>(`${environment.API_URL}/word`, word);
  }

  deleteWord(wordId): Observable<any> {
    // console.log('DELETE WORD SERVICE', wordId);
    return this.http.delete<any>(`${environment.API_URL}/word/${wordId}`);
  }

  deleteManyWords(wordsIds): Observable<any> {
    // console.log('DELETE MANY WORDS SERVICE', wordsIds);
    return this.http.post<any>(
      `${environment.API_URL}/word/deleteMany`,
      wordsIds
    );
  }

  updateWord(word, overwrite): Observable<any> {
    console.log('UPDATE WORD SERVICE', word);
    return this.http.post<any>(`${environment.API_URL}/word/${word._id}`, {
      wordData: word,
      overwrite
    });
  }

  searchReverso(word): Observable<any> {
    return this.http.get<any>(`${environment.API_URL}/word/search/${word}`);
  }

  // deleteManyWords(wordsIds): Observable<any> {
  //   return this.http.delete<any>(`${environment.API_URL}/word`, {
  //     wordsIds
  //   });
  // }
}

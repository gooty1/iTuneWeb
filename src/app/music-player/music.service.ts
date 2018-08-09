import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { SongModel } from './song-model';
import { SongSearchResult } from './song-search-result';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({ providedIn: 'root' })
export class MusicService {

  private musicsUrl = 'api/search';  // URL to web api

  constructor(
    private http: HttpClient) { }

  /** GET heroes from the server */
  getHeroes (): Observable<SongModel[]> {
    return this.http.get<SongModel[]>(this.musicsUrl)
      .pipe(
        catchError(this.handleError('getHeroes', []))
      );
  }

  /** GET hero by id. Will 404 if id not found */
  getHero(id: number): Observable<SongModel> {
    const url = `${this.musicsUrl}/${id}`;
    return this.http.get<SongModel>(url).pipe(
      catchError(this.handleError<SongModel>(`getHero id=${id}`))
    );
  }

  /* GET heroes whose name contains search term */
  searchHeroes(term: string): Observable<SongSearchResult> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of({
      });
    }
    return this.http.get<SongSearchResult>(`${this.musicsUrl}?term=${term}`).pipe(
      catchError(this.handleError<SongSearchResult>('searchHeroes', {}))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
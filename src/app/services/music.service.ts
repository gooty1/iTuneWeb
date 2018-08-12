import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, filter, switchMap } from 'rxjs/operators';
import { SongSearchResult, SongModel } from '../models';

@Injectable({ providedIn: 'root' })
export class MusicService {

  private musicsUrl = 'api/';

  constructor(private http: HttpClient) { }

  searchArtist(term: string): Observable<SongModel[]> {
    if (!term.trim()) {
      return of([]);
    }
    return this.query('search', `term=${term}`);
  }

  lookupAlbum(collectionId: number): Observable<SongModel[]> {
    if (!collectionId) {
      return of([]);
    }
    return this.query('lookup', `id=${collectionId}&entity=song`).pipe(
      switchMap((result: SongModel[]) => {
        return of(result.filter(item => item.wrapperType === 'track'));
      }),
    );
  }

  query(action: string, keys: string): Observable<SongModel[]> {
    return this.http.get<SongSearchResult>(`${this.musicsUrl}${action}?${keys}`).pipe(
      switchMap((result: SongSearchResult) => {
        return of(result.results);
      }),
      catchError(this.handleError<SongModel[]>(action, []))
    );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}

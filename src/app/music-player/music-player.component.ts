import { Component, OnInit } from '@angular/core';
import { MusicService } from './music.service'; 
import { Observable, Subject } from 'rxjs';
import { SongModel } from './song-model';
import { debounceTime, switchMap, distinctUntilChanged, pluck } from 'rxjs/operators';

@Component({
  selector: 'music-player',
  templateUrl: './music-player.component.html',
  styleUrls: ['./music-player.component.scss']
})
export class MusicPlayerComponent implements OnInit {

    heroes$: Observable<SongModel[]>;
    private searchTerms = new Subject<string>();

    constructor(private musicService: MusicService) {}

    ngOnInit() {
        this.heroes$ = this.searchTerms.pipe(
            debounceTime(300),
            distinctUntilChanged(),
            switchMap((term: string) => this.musicService.searchHeroes(term)),
            pluck('results')
          );
    }

    search(term: string): void {
        this.searchTerms.next(term);
      }
    
    onTrackClicked(songModel: SongModel) {

    }
}

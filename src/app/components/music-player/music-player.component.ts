import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { debounceTime, switchMap, distinctUntilChanged } from 'rxjs/operators';
import { isMobile } from 'is-mobile';
import { MusicService } from '../../services/music.service';
import { SongModel } from '../../models';
@Component({
  selector: 'music-player',
  templateUrl: './music-player.component.html',
  styleUrls: ['./music-player.component.scss']
})
export class MusicPlayerComponent implements OnInit {
    tracks$: Observable<SongModel[]>;
    selectedTrack: SongModel;
    private searchTerms = new Subject<string>();
    private isMobile: boolean;

    constructor(private musicService: MusicService) {
      this.isMobile = isMobile();
    }

    ngOnInit() {
        this.tracks$ = this.searchTerms.pipe(
            debounceTime(300),
            distinctUntilChanged(),
            switchMap((term: string) => this.musicService.searchArtist(term))
          );
    }

    search(term: string): void {
        this.searchTerms.next(term);
      }
    
    onTrackClicked(songModel: SongModel) {
      this.selectedTrack = {...songModel};
    }
}

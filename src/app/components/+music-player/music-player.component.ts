import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { debounceTime, switchMap, distinctUntilChanged } from 'rxjs/operators';
import { isMobile } from 'is-mobile';
import { faMusic } from '@fortawesome/free-solid-svg-icons';
import { MusicService } from '../../services/music.service';
import { SongModel } from '../../models';
import { fadeIn, slideIn } from '../../animations';

@Component({
  selector: 'music-player',
  templateUrl: './music-player.component.html',
  styleUrls: ['./music-player.component.scss'],
  animations: [fadeIn, slideIn]
})
export class MusicPlayerComponent implements OnInit {
    tracks$: Observable<SongModel[]>;
    selectedTrack: SongModel;
    faMusic = faMusic;
    private searchTerms = new Subject<string>();
    private isMobile: boolean;
    private isLoading: boolean;

    constructor(private musicService: MusicService) {
      // We need to detect if it is mobile browser to decide whether or not to perform an album lookup
      this.isMobile = isMobile();
    }

    ngOnInit(): void {
      this.tracks$ = this.searchTerms.pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((term: string) => {
          this.isLoading = true;
          return this.musicService.searchArtist(term);
        })
      );

      this.tracks$.subscribe((items) => {
        if(items.length > 0) {
          this.isLoading = false;
        }
      })
    }

    search(term: string): void {
      this.searchTerms.next(term);
    }

    onTrackClicked(songModel: SongModel): void {
      this.selectedTrack = songModel;
    }
}

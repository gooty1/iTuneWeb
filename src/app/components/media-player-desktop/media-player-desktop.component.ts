import { Component, OnChanges, Input, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { faPlay, faPause } from '@fortawesome/free-solid-svg-icons';
import { SongModel } from '../../models';
import { MusicService } from '../../services';

@Component({
  selector: 'media-player-desktop',
  templateUrl: './media-player-desktop.component.html',
  styleUrls: ['./media-player-desktop.component.scss']
})
export class MediaPlayerDesktopComponent implements OnChanges {
    faPlay = faPlay;
    faPause = faPause;
    tracks$: Observable<SongModel[]>;

    @Input() track: SongModel;
    private isTrackPlaying: boolean = false;

    constructor(private musicService: MusicService) {}

    ngOnChanges(changes: SimpleChanges) {
      const currentValue = changes['track'].currentValue as SongModel;
      const previousValue = changes['track'].previousValue as SongModel;

      if (!previousValue && currentValue.collectionId || (previousValue && previousValue.collectionId !== currentValue.collectionId)) {
        this.tracks$ = this.musicService.lookupAlbum(currentValue.collectionId)
      }
    }

    play() {
      this.isTrackPlaying = true;
    }

    pause() {
      this.isTrackPlaying = false;
    }
}

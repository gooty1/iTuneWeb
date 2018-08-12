import { Component, OnChanges, Input, SimpleChanges, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { faPlayCircle, faPauseCircle } from '@fortawesome/free-solid-svg-icons';
import { SongModel } from '../../../models';
import { MusicService } from '../../../services';

@Component({
  selector: 'media-player-desktop',
  templateUrl: './media-player-desktop.component.html',
  styleUrls: ['./media-player-desktop.component.scss']
})
export class MediaPlayerDesktopComponent implements OnChanges {
    faPlayCircle = faPlayCircle;
    faPauseCircle = faPauseCircle;
    tracks$: Observable<SongModel[]>;

    @ViewChild('audio') audio;
    @Input() track: SongModel;
    private isTrackPlaying: boolean = false;

    constructor(private musicService: MusicService) {}

    ngOnChanges(changes: SimpleChanges) {
      const currentValue = changes['track'].currentValue as SongModel;
      const previousValue = changes['track'].previousValue as SongModel;

      if (!previousValue && currentValue.collectionId || (previousValue && previousValue.collectionId !== currentValue.collectionId)) {
        this.tracks$ = this.musicService.lookupAlbum(currentValue.collectionId);
      }
      this.audio.nativeElement.load();
      this.isTrackPlaying = false;
    }

    play(): void {
      this.isTrackPlaying = true;
      this.audio.nativeElement.play();
    }

    pause(): void {
      this.isTrackPlaying = false;
      this.audio.nativeElement.pause();
    }
}

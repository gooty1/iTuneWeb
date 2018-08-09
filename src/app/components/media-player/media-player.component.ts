import { Component, OnInit, Input } from '@angular/core';
import { faPlay, faFastBackward, faFastForward, faPause } from '@fortawesome/free-solid-svg-icons';
import { SongModel } from '../../models';

@Component({
  selector: 'media-player',
  templateUrl: './media-player.component.html',
  styleUrls: ['./media-player.component.scss']
})
export class MediaPlayerComponent implements OnInit {
    faPlay = faPlay;
    faFastBackward = faFastBackward;
    faFastForward = faFastForward;
    faPause = faPause;

    @Input() track: SongModel;
    private isTrackPlaying: boolean;

    constructor() {}
    ngOnInit() {
      this.isTrackPlaying = true;
    }

    play() {
      this.isTrackPlaying = true;
    }

    pause() {
      this.isTrackPlaying = false;
    }
}

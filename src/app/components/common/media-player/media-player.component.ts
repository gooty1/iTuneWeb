import { Component, AfterViewInit, OnChanges, Input, ViewChild, SimpleChanges, OnDestroy } from '@angular/core';
import { faPlay, faFastBackward, faFastForward, faPause } from '@fortawesome/free-solid-svg-icons';
import { of, interval, Subscription } from 'rxjs';
import { delay, takeWhile } from 'rxjs/operators';
import { SongModel } from '../../../models';
import { slideUp } from '../../../animations';

@Component({
  selector: 'media-player',
  templateUrl: './media-player.component.html',
  styleUrls: ['./media-player.component.scss'],
  animations: [slideUp]
})
export class MediaPlayerComponent implements AfterViewInit, OnChanges, OnDestroy {
    faPlay = faPlay;
    faFastBackward = faFastBackward;
    faFastForward = faFastForward;
    faPause = faPause;

    @ViewChild('audio') audio;
    @Input() track: SongModel;
    private isTrackPlaying: boolean;
    private progress: string;
    private progressSubscription: Subscription;

    constructor() {}

    ngAfterViewInit() {
      if (this.track) {
        of('').pipe(
          delay(0)
        ).subscribe(() => this.play());
      }
      
      this.updateProgress();
    }

    ngOnChanges(changes: SimpleChanges) {
      if (this.audio && changes['track'].currentValue) {
        this.audio.nativeElement.load();
        this.progress = '0%';
        this.play();
        this.updateProgress();
      }
    }

    ngOnDestroy() {
      this.progressSubscription.unsubscribe();
    }

    updateProgress(): void {
      this.progressSubscription = interval(200).pipe(
        takeWhile(() => {
          return !this.audio.nativeElement.ended;
        })
      ).subscribe(() => {
        this.progress = 100 * this.audio.nativeElement.currentTime / this.audio.nativeElement.duration + '%';
      }, (err) => {
        // TODO: Handle error
        console.log(err);
      }, () => this.isTrackPlaying = false);
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

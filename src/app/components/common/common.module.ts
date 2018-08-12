import { NgModule } from '@angular/core';
import { MediaPlayerComponent } from './media-player';
import { MediaPlayerDesktopComponent } from './media-player-desktop';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [
    MediaPlayerComponent,
    MediaPlayerDesktopComponent
  ],
  exports: [
    MediaPlayerComponent,
    MediaPlayerDesktopComponent
  ],
  imports: [BrowserModule, FontAwesomeModule],
  providers: [],
  bootstrap: []
})
export class CommonModule { }

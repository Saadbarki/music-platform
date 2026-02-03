import { Component, Input, inject } from '@angular/core';
import { PlayerService } from '../../services/player.service';
import { Song } from '../../services/music.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-music-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './music-card.html',
  styleUrl: './music-card.css',
})
export class MusicCard {
  // We use the Song object passed from the app.html loop
  @Input() song?: Song;

  private playerService = inject(PlayerService);

  onPlay() {
    if (this.song) {
      // CHANGED: playSong -> setCurrentSong
      this.playerService.setCurrentSong(this.song);
    }
  }
}

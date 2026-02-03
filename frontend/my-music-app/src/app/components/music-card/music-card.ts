import { Component, Input, inject } from '@angular/core';
import { Song } from '../../services/music.service';
import { PlayerService } from '../../services/player.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-music-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './music-card.html'
})
export class MusicCard {
  @Input({ required: true }) song!: Song;
  private playerService = inject(PlayerService);

  onPlay() {
    this.playerService.play(this.song);
  }
}

import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-music-card',
  imports: [],
  templateUrl: './music-card.html',
  styleUrl: './music-card.css',
})
export class MusicCard {
  @Input() title: string = 'Song Title';
  @Input() description: string = 'Artist Name';
  @Input() imageUrl: string = 'https://via.placeholder.com/300';
}

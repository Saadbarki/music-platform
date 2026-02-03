import { Component, signal, inject, OnInit } from '@angular/core';
import { Player } from './components/player/player';
import { Sidebar } from './components/sidebar/sidebar';
import { MusicCard } from './components/music-card/music-card';
import { SearchBar } from './components/search-bar/search-bar';
import { MusicService, Song } from './services/music.service';
import { PlayerService } from './services/player.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, Player, Sidebar, MusicCard, SearchBar],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  protected songs = signal<Song[]>([]);
  protected loading = signal(true);
  private musicService = inject(MusicService);
  private playerService = inject(PlayerService);

  ngOnInit() {
    this.musicService.getSongs().subscribe({
      next: (data) => {
        // Add placeholder thumbnails without calling iTunes
        const songsWithThumbnails = data.map(song => ({
          ...song,
          thumbnailUrl: this.getPlaceholderImage(song.id)
        }));
        
        this.songs.set(songsWithThumbnails);
        this.loading.set(false);
        this.playerService.setPlaylist(songsWithThumbnails);
        
        if (songsWithThumbnails.length > 0) {
          this.playerService.currentSong.set(songsWithThumbnails[0]);
        }
      },
      error: () => this.loading.set(false)
    });
  }

  private getPlaceholderImage(id: number): string {
    // Use picsum for varied placeholder images
    return `https://picsum.photos/seed/${id}/600`;
  }

  onSelectSong(song: Song) {
    this.playerService.setCurrentSong(song);
  }
}

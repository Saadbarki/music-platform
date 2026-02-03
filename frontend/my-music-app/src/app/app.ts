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
  protected playerService = inject(PlayerService); // Changed to protected to access in HTML if needed

  ngOnInit() {
    this.loadSongs();
  }

  loadSongs() {
    this.loading.set(true);
    this.musicService.getSongs().subscribe({
      next: (data) => {
        this.songs.set(data);
        // Tell the player service about the current list of songs
        this.playerService.setPlaylist(data);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Failed to load songs', err);
        this.loading.set(false);
      }
    });
  }

  // This handles the Search Bar results
  onSearchResults(results: Song[]) {
    this.songs.set(results);
    // Update playlist so "Next" works with search results
    this.playerService.setPlaylist(results);
  }

  onSongSelect(song: Song) {
    // FIX: Calling 'play' instead of 'setCurrentSong'
    this.playerService.play(song);
  }
}

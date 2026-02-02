import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Player } from './components/player/player';
import { Sidebar } from './components/sidebar/sidebar';
import { MusicCard } from './components/music-card/music-card';
import { SearchBar } from './components/search-bar/search-bar';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Player, Sidebar, MusicCard, SearchBar],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('my-music-app');
}

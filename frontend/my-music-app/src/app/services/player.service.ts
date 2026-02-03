import { Injectable, signal } from '@angular/core';
import { Song } from './music.service';

@Injectable({ providedIn: 'root' })
export class PlayerService {
  private audio = new Audio();
  currentSong = signal<Song | null>(null);
  isPlaying = signal(false);
  currentTime = signal(0);
  duration = signal(0);
  volume = signal(0.7);

  private playlist = signal<Song[]>([]);
  private currentIndex = signal(-1);

  constructor() {
    this.audio.volume = this.volume();
    this.audio.addEventListener('timeupdate', () => this.currentTime.set(this.audio.currentTime));
    this.audio.addEventListener('loadedmetadata', () => this.duration.set(this.audio.duration));
    this.audio.addEventListener('ended', () => this.next());
  }

  setPlaylist(songs: Song[]) {
    this.playlist.set(songs);
  }

  async play(song: Song) {
    if (!song.url) return;
    
    const index = this.playlist().findIndex(s => s.id === song.id);
    this.currentIndex.set(index);
    this.currentSong.set(song);

    // FIX: Proper source loading
    this.audio.src = song.url;
    this.audio.load(); 
    try {
      await this.audio.play();
      this.isPlaying.set(true);
    } catch (err) {
      console.error("Playback failed", err);
    }
  }

  togglePlayPause() {
    if (!this.currentSong()) return;
    this.isPlaying() ? this.audio.pause() : this.audio.play();
    this.isPlaying.set(!this.isPlaying());
  }

  next() {
    if (this.playlist().length === 0) return;
    const nextIdx = (this.currentIndex() + 1) % this.playlist().length;
    this.play(this.playlist()[nextIdx]);
  }

  previous() {
    if (this.playlist().length === 0) return;
    let prevIdx = this.currentIndex() - 1;
    if (prevIdx < 0) prevIdx = this.playlist().length - 1;
    this.play(this.playlist()[prevIdx]);
  }

  seek(time: number) {
    this.audio.currentTime = time;
  }

  setVolume(val: number) {
    this.volume.set(val);
    this.audio.volume = val;
  }
}

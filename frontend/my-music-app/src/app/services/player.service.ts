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
  private currentIndex = signal(0);

  constructor() {
    this.audio.addEventListener('timeupdate', () => this.currentTime.set(this.audio.currentTime));
    this.audio.addEventListener('loadedmetadata', () => this.duration.set(this.audio.duration));
    this.audio.addEventListener('ended', () => {
      this.isPlaying.set(false);
      this.playNext();
    });
  }

  setPlaylist(songs: Song[]) {
    this.playlist.set(songs);
  }

  async setCurrentSong(song: Song) {
    const index = this.playlist().findIndex(s => s.id === song.id);
    if (index !== -1) {
      this.currentIndex.set(index);
    }

    this.currentSong.set(song);
    this.audio.pause();
    this.audio.currentTime = 0;
    this.audio.src = '';

    if (song.songUrl) {
      this.audio.src = song.songUrl;
      this.audio.load();

      try {
        await this.audio.play();
        this.isPlaying.set(true);
      } catch (err) {
        console.error("Playback was interrupted or blocked:", err);
        this.isPlaying.set(false);
      }
    }
  }

  async playNext() {
    const songs = this.playlist();
    if (songs.length === 0) return;

    const nextIndex = (this.currentIndex() + 1) % songs.length;
    await this.setCurrentSong(songs[nextIndex]);
  }

  async playPrevious() {
    const songs = this.playlist();
    if (songs.length === 0) return;

    const prevIndex = (this.currentIndex() - 1 + songs.length) % songs.length;
    await this.setCurrentSong(songs[prevIndex]);
  }

  togglePlayPause() {
    if (!this.audio.src) return;
    if (this.isPlaying()) {
      this.audio.pause();
      this.isPlaying.set(false);
    } else {
      this.audio.play().then(() => this.isPlaying.set(true));
    }
  }

  seek(time: number) { this.audio.currentTime = time; }
  setVolume(val: number) { this.audio.volume = val; this.volume.set(val); }
  
  formatTime(seconds: number): string {
    if (!seconds || isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }
}

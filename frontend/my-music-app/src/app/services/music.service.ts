import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { map } from 'rxjs/operators';

export interface Song {
  id: number;
  title: string;
  artist: string;
  blobUrl: string;
  songUrl?: string;
  thumbnailUrl?: string;
  uploadedAt: string;
}

@Injectable({ providedIn: 'root' })
export class MusicService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:5074/api/songs';

  getSongs() {
    return this.http.get<Song[]>(`${this.apiUrl}/all`).pipe(
      map((songs: Song[]) => songs.map(song => ({
        ...song,
        songUrl: song.blobUrl
      })))
    );
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { map } from 'rxjs/operators';

export interface Song {
  id: number;
  url: string;
  title: string;
  artist: string;
  blobUrl: string;
  thumbnailUrl?: string;
  uploadedAt: string;
}

@Injectable({ providedIn: 'root' })
export class MusicService {
  private http = inject(HttpClient);
  private apiUrl = 'https://musicservice-api-fkgycte4gufeh6az.canadacentral-01.azurewebsites.net/api/songs';
  getSongs() {
    return this.http.get<Song[]>(`${this.apiUrl}/all`).pipe(
      map((songs) => songs.map(song => ({
        ...song,
        url: song.blobUrl,
        // This ensures every song has an image, even if the backend is empty
        thumbnailUrl: song.thumbnailUrl || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(song.artist)}&backgroundColor=1db954&fontSize=40`
      })))
    );
  }
}

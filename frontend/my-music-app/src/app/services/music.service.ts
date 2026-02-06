import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { map } from 'rxjs/operators';

export interface Song {
  id: number;
  title: string;
  artist: string;
  blobUrl: string;
  url?: string;
  thumbnailUrl?: string;
  uploadedAt: string;
}

@Injectable({ providedIn: 'root' })
export class MusicService {
  private http = inject(HttpClient);
  private apiUrl = 'https://musicservice-api-fkgycte4gufeh6az.canadacentral-01.azurewebsites.net/api/songs';

  getSongs() {
    return this.http.get<Song[]>(`${this.apiUrl}/all`).pipe(
      map((songs: Song[]) => songs.map(song => ({
        ...song,
        url: song.blobUrl
      })))
    );
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SongService {
  constructor(private http: HttpClient) {}

  getSongs() {
    return this.http.get<any[]>(`${environment.baseURL}/api/songs/all`).pipe(
      map(songs => ({
        tracks: songs.map(song => ({
          name: song.title,
          artists: [{ name: song.artist }],
          album: { images: [{ url: 'assets/default-cover.jpg' }] }, // placeholder cover
          preview_url: song.blobUrl
        }))
      }))
    );
  }
}

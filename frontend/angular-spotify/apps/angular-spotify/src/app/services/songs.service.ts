import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Song {
  id: number;
  title: string;
  artist: string;
  blobUrl: string;
  uploadedAt: string;
}

@Injectable({
  providedIn: 'root'
})
export class SongsService {
  private apiUrl = 'https://musicservice-api-fkgycte4gufeh6az.canadacentral-01.azurewebsites.net/api/Songs/all';

  constructor(private http: HttpClient) {}

  getAllSongs(): Observable<Song[]> {
    return this.http.get<Song[]>(this.apiUrl);
  }
}

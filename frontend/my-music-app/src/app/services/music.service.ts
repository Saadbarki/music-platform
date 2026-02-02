import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class MusicService {
  private http = inject(HttpClient);
  // When local, use localhost. When deployed, use your Azure App Service URL.
  private apiUrl = 'http://localhost:5000/api/songs'; 

  getSongs() {
    return this.http.get<any[]>(this.apiUrl);
  }
}

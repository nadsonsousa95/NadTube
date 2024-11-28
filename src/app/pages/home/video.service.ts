import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs';

export interface Video {
  id: number;
  title: string;
  description: string;
  url: string;
  thumbnail: string;
  views: number;
  uploadedAt: string;
}

@Injectable({
  providedIn: 'root'
})
export class VideoService {
  private baseUrl = 'http://localhost:3000/videos'; // URL do json-server

  constructor(private http: HttpClient) {}

  // Obter todos os vídeos
  getVideos(): Observable<Video[]> {
    return this.http.get<Video[]>(this.baseUrl);
  }

  // Obter um vídeo específico pelo ID
  getVideoById(id: number): Observable<Video> {
    return this.http.get<Video>(`${this.baseUrl}/${id}`);
  }

  // Incrementar visualizações de um vídeo
  incrementViews(id: number, views: number): Observable<Video> {
    return this.http.patch<Video>(`${this.baseUrl}/${id}`, { views: views + 1 });
  }

  searchVideos(term: string): Observable<Video[]> {
    return this.http.get<Video[]>(this.baseUrl).pipe(
      map((videos) =>
        videos.filter((video) =>
          video.title.toLowerCase().includes(term.toLowerCase()) ||
          video.description.toLowerCase().includes(term.toLowerCase()) // Filtra por título e descrição
        )
      )
    );
  }
  
}

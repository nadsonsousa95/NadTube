import { Component, OnInit } from '@angular/core';
import { VideoService, Video } from './video.service';
import { VideoDetailComponent } from '../video/video-detail.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-home',
  imports: [VideoDetailComponent, CommonModule, FormsModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  videos: Video[] = [];
  filteredVideos: Video[] = [];
  searchTerm: string = '';

  constructor(private videoService: VideoService) {}

  ngOnInit(): void {
    this.fetchVideos();
  }

  fetchVideos(): void {
    this.videoService.getVideos().subscribe((data) => {
      this.videos = data;
    });
  }
  watchVideo(video: Video): void {
    // Redireciona para a página do vídeo ou exibe um modal.
    console.log(`Assistindo ao vídeo: ${video.title}`);
    window.open(video.url, '_blank'); // Abre o vídeo em uma nova aba
  }

  onSearch(): void {
    const term = this.searchTerm.trim().toLowerCase(); // Remove espaços extras e converte para minúsculas
    if (term) {
      this.filteredVideos = this.videos.filter((video) =>
        video.title.toLowerCase().includes(term) || // Verifica se o título contém o termo
        video.description.toLowerCase().includes(term) // Verifica se a descrição contém o termo
      );
    }
  }
  
}

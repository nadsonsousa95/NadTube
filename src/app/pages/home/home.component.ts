import { Component, OnInit } from '@angular/core';
import { VideoService, Video } from './video.service';
import { VideoDetailComponent } from '../video/video-detail.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-home',
  imports: [ReactiveFormsModule, CommonModule, FormsModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  videos: Video[] = [];
  filteredVideos: Video[] = [];
  searchTerm: string = '';

  constructor(
    private videoService: VideoService, 
    private router:Router) {}

  ngOnInit(): void {
    this.fetchVideos();
  }

  // Busca a lista de vídeos do serviço e a atribui á propriedade videos
  fetchVideos(): void {
    this.videoService.getVideos().subscribe((data) => {
      this.videos = data;
    });
  }
  
  watchVideo(video: Video): void {
    // Incrementa a visualização no backend
    console.log('ID do vídeo:', video.id);
    this.videoService.incrementViews(video.id, video.views).subscribe(
      (updatedVideo) => {
        console.log(`Visualizações do vídeo "${updatedVideo.title}" aumentadas.`);
        // Atualiza o número de views localmente
        video.views = updatedVideo.views;
      },
      (error) => {
        console.error('Erro ao incrementar visualizações:', error);
      }
    );
  
    // Redireciona para a página do vídeo
    this.router.navigate(['/exibe-video'], { queryParams: { url: video.url } });
  }
  

  // Filtra os vídeos com base no termo de pesquisa
  onSearch(): void {
    const term = this.searchTerm.trim().toLowerCase();
    if (term) {
      this.filteredVideos = this.videos.filter((video) =>
        video.title.toLowerCase().includes(term)
      );
    } else {
      this.filteredVideos = []; // Mostra todos os vídeos se a busca estiver vazia
    }
  }
  
}

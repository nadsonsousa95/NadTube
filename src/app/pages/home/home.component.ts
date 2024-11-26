import { Component, OnInit } from '@angular/core';
import { VideoService, Video } from './video.service';
import { VideoDetailComponent } from '../video/video-detail.component';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-home',
  imports: [VideoDetailComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  videos: Video[] = [];

  constructor(private videoService: VideoService) {}

  ngOnInit(): void {
    this.fetchVideos();
    alert("Seja Bem vindo!")
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
  
}

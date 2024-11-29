import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VideoService, Video } from '../home/video.service';
import { SafeUrlPipe } from './safe-url.pipe';
import { CommonModule } from '@angular/common';

declare var YT: any; // Declarar a variável da API do YouTube
@Component({
  selector: 'app-video-detail',
  imports: [CommonModule],
  templateUrl: './video-detail.component.html',
  styleUrls: ['./video-detail.component.css']
})
export class VideoDetailComponent implements OnInit, AfterViewInit {
    videoUrl: string | undefined;
     // Objeto para armazenar informações do vídeo
    videoId: string | undefined;
    currentVideo: Video | undefined;

    constructor(private route: ActivatedRoute,  private videoService: VideoService) {}

    ngOnInit(): void {
      this.route.queryParams.subscribe((params) => {
        this.videoUrl = params['url'];
        if (this.videoUrl) {
          this.videoId = this.extractVideoId(this.videoUrl);
        }
      });
    }
  
    ngAfterViewInit(): void {
      if (this.videoId) {
        this.loadYouTubePlayer();
      }
    }
  
    extractVideoId(url: string): string {
      const regex = /(?:https?:\/\/(?:www\.)?youtube\.com\/(?:watch\?v=|embed\/|v\/)|youtu\.be\/)([\w-]{11})/;
      const match = url.match(regex);
      return match ? match[1] : '';
    }
  
    loadYouTubePlayer() {
      if (!(window as any)['YT'] || !(window as any)['YT'].Player) {
  setTimeout(() => this.loadYouTubePlayer(), 500);
  return;
}

  
      const playerElement = document.getElementById('video-player');
      if (playerElement && this.videoId) {
        new YT.Player(playerElement, {
          videoId: this.videoId,
          playerVars: {
            autoplay: 1,
            controls: 1,
            rel: 0,
            modestbranding: 1,
          },
        });
      }
    }
  }
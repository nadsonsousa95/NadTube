import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VideoService, Video } from '../home/video.service';
import { SafeUrlPipe } from './safe-url.pipe';
import { CommonModule } from '@angular/common';

@Component({
    standalone: true,
    imports: [SafeUrlPipe, CommonModule],
  selector: 'app-video-detail',
  templateUrl: './video-detail.component.html',
  styleUrls: ['./video-detail.component.css']
})
export class VideoDetailComponent implements OnInit {
  video: Video | null = null;

  constructor(private route: ActivatedRoute, private videoService: VideoService) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.videoService.getVideoById(id).subscribe((data) => {
        this.video = data;
        this.incrementViews();
      });
    }
  }

  incrementViews(): void {
    if (this.video) {
      this.videoService.incrementViews(this.video.id, this.video.views).subscribe((updatedVideo) => {
        this.video = updatedVideo;
      });
    }
  }
} 
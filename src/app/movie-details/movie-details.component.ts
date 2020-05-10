import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Movie } from '../shared/models/movie';
import { MovieService } from '../shared/services/movie.service';
import { SafePipe } from '../shared/pipes/safe.pipe';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css'],
  styles: [
    `
      .star {
        font-size: 1.5rem;
        color: #b0c4de;
      }
      .filled {
        color: orange;
      }
      .bad {
        color: #deb0b0;
      }
      .filled.bad {
        color: #ff1e1e;
      }
    `,
  ],
})
export class MovieDetailsComponent {
  @Input()
  movie: Movie;
  youtubeUrl = 'https://www.youtube.com/embed/';
  currentRate = 8;

  getYoutubeThumbUrlSanitized(url: string) {
    const youtubeThumbUrl = 'https://img.youtube.com/vi/';
    const urlSanitized = 'url(' + youtubeThumbUrl + url + '/maxresdefault.jpg)';
    return urlSanitized;
  }
}

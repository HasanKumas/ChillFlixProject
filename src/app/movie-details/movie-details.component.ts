import { Component, OnInit, Input, ViewChild } from '@angular/core';
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
})
export class MovieDetailsComponent {
  @Input()
  movie: Movie;
  youtubeUrl = 'https://www.youtube.com/embed/';
  currentRate = 8;
  public play: boolean;
  public movieUrl;
  @ViewChild('details') details;

  getYoutubeThumbUrlSanitized(url: string) {
    const youtubeThumbUrl = 'https://img.youtube.com/vi/';
    const urlSanitized = 'url(' + youtubeThumbUrl + url + '/maxresdefault.jpg)';
    return urlSanitized;
  }
}

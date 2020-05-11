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
  currentRate = 5;
  public play: boolean;
  public movieUrl;
  @ViewChild('details') details;

  constructor(private readonly movieService: MovieService) {}

  getYoutubeThumbUrlSanitized(url: string) {
    const youtubeThumbUrl = 'https://img.youtube.com/vi/';
    const urlSanitized = 'url(' + youtubeThumbUrl + url + '/maxresdefault.jpg)';
    return urlSanitized;
  }

  rate() {
    this.movieService
      .rateMovie(this.movie, this.currentRate)
      .subscribe((ratedMovie) => {
        alert(`The movie has been rated!`);
        this.movie = ratedMovie;
        this.currentRate = this.movie.rating;
      });
  }
}

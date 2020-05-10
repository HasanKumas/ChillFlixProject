import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Movie } from '../shared/models/movie';
import { MovieService } from '../shared/services/movie.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css'],
})
export class SearchResultsComponent implements OnInit {
  public movie: Movie;
  public youtubeUrl: string;
  public youtubeThumbUrl: string;
  public id;

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService
  ) {}

  ngOnInit(): void {
    this.getMovie();
  }

  getMovie(): void {
    this.route.paramMap.subscribe((paramMap) => {
      this.id = Number(paramMap.get(`movie.id`));
      // Get the movie details from the server
      this.movieService.getMovie(this.id).subscribe(
        (movie) => {
          this.movie = movie;
          const youtubeUrl = 'https://www.youtube.com/embed/';
          this.youtubeUrl = youtubeUrl + movie.url;
          this.youtubeThumbUrl =
            `https://img.youtube.com/vi/` +
            this.movie.url +
            `/maxresdefault.jpg`;
        },
        (error) => {
          alert(`we couldn't find the movie you are looking for! The error
        is: ${error}`);
        }
      );
    });
  }
}

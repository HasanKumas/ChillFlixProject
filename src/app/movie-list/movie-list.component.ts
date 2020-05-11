import { Component, OnInit, ViewChild } from '@angular/core';
import { Movie } from '../shared/models/movie';
import { MovieService } from '../shared/services/movie.service';
import { CategoryService } from '../shared/services/category.service';
import { Category } from '../shared/models/category';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css'],
})
export class MovieListComponent implements OnInit {
  public currentMovie: Movie;
  public movies: Movie[] = [];
  public categories: Category[] = [];
  @ViewChild('scrollToTop') scrollToTop;

  constructor(
    private movieService: MovieService,
    private categoryService: CategoryService
  ) {}

  // public movieSlides = [[]];
  // chunk(arr, chunkSize: number) {
  //   const R = [];
  //   for (let i = 0, len = arr.length; i < len; i += chunkSize) {
  //     R.push(arr.slice(i, i + chunkSize));
  //   }
  //   return R;
  // }

  ngOnInit() {
    const movies$ = this.movieService.getMovies();
    movies$.subscribe((movies) => {
      this.movies = movies;
      // this.movieSlides = this.chunk(this.movies, 4);
      this.currentMovie = this.movies[0];
    });
    const categories$ = this.categoryService.getCategories();
    categories$.subscribe((categories) => {
      this.categories = categories;
    });
  }

  sendCurrent(currentMovie: Movie) {
    this.currentMovie = currentMovie;
    window.scrollTo(0, 0);
  }
}

import { Component, OnInit, Input } from '@angular/core';
import { Category } from '../shared/models/category';
import { MovieService } from '../shared/services/movie.service';
import { Movie } from '../shared/models/movie';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css'],
})
export class CategoryListComponent implements OnInit {
  @Input() category: Category;
  public movies: Movie[] = [];
  public categoryId: number;
  public currentMovie: Movie;

  constructor(
    private readonly movieService: MovieService,
    private readonly activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((paramMap) => {
      this.categoryId = Number(paramMap.get('category.id'));
      // Get the movie details from the server
      this.movieService.getMoviesByCategory(this.categoryId).subscribe(
        (movies) => {
          this.movies = movies;
          this.currentMovie = movies[0];
        },
        (error) => {
          alert(`we couldn't find the movies you are looking for! The error
        is: ${error}`);
        }
      );
    });
  }
  sendCurrent(currentMovie: Movie) {
    this.currentMovie = currentMovie;
  }
}

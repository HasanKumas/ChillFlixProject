import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { MovieService } from '../shared/services/movie.service';
import { Movie } from '../shared/models/movie';
import { CategoryService } from '../shared/services/category.service';
import { Category } from '../shared/models/category';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationModalComponent } from '../modals/confirmation-modal/confirmation-modal.component';

@Component({
  selector: 'app-movie-adding-form',
  templateUrl: './movie-adding-form.component.html',
  styleUrls: ['./movie-adding-form.component.css'],
})
export class MovieAddingFormComponent implements OnInit {
  public movies: Movie[] = [];
  // public movieTitle: string;
  // public movieYear: number;
  // public movieRating: number;
  // public movieDescription: string;
  // public movieUrl: string;
  // public movieId: number;

  public categories: Category[] = [];
  public currentMovie: Movie;

  constructor(
    private readonly movieService: MovieService,
    private readonly categoryService: CategoryService,
    private readonly ngbModalService: NgbModal
  ) {}

  // adds a movie to backend
  public addMovie(movie: Movie): void {
    this.movieService.addMovie(movie).subscribe((newMovie) => {
      alert(`The movie has been added`);
      this.movies.push(newMovie);
    });
  }

  // initialize movies and categories
  ngOnInit(): void {
    const categories$ = this.categoryService.getCategories();
    categories$.subscribe((categories) => {
      this.categories = categories;
    });

    const movies$ = this.movieService.getMovies();
    movies$.subscribe((movies) => {
      this.movies = movies;
    });
  }

  // delete a movie
  delete(movie: Movie): void {
    const modal = this.ngbModalService.open(ConfirmationModalComponent);
    const modalComponent = modal.componentInstance as ConfirmationModalComponent;

    modalComponent.text = `Are you sure you want to delete movie
    ${movie.title} with id ${movie.id}?`;

    modalComponent.title = 'Are you sure?';

    modal.result.then(
      () => {
        this.movieService.deleteMovie(movie).subscribe(() => {
          // Delete movie with id {movieToDelete.id}
          this.movies = this.movies.filter(
            (movieDeleted) => movieDeleted.id !== movie.id
          );
        });
      },
      () => {
        // Rejected the operation.
      }
    );
  }

  // make changes on movie array
  edit(currentMovie: Movie): void {
    this.currentMovie = currentMovie;
  }

  // save changes to backend
  editMovie(movie: Movie) {
    this.movieService.updateMovie(movie).subscribe(() => {
      alert(`The movie has been updated!`);
      const itemIndex = this.movies.findIndex((item) => item.id === movie.id);
      this.movies[itemIndex] = movie;
      this.currentMovie = undefined;
    });
  }
}

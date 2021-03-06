import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { MovieService } from '../shared/services/movie.service';
import { Movie } from '../shared/models/movie';
import { CategoryService } from '../shared/services/category.service';
import { Category } from '../shared/models/category';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationModalComponent } from '../modals/confirmation-modal/confirmation-modal.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-movie-adding-form',
  templateUrl: './movie-adding-form.component.html',
  styleUrls: ['./movie-adding-form.component.css'],
})
export class MovieAddingFormComponent implements OnInit {
  editField: string;

  public isCollapsed = true;
  public movies: Movie[] = [];

  public categories: Category[] = [];
  public currentMovie: Movie;

  constructor(
    private readonly movieService: MovieService,
    private readonly categoryService: CategoryService,
    private readonly ngbModalService: NgbModal,
    private readonly activatedRoute: ActivatedRoute
  ) {}

  // adds a movie to backend
  public addMovie(movie: Movie): void {
    const modal = this.ngbModalService.open(ConfirmationModalComponent);
    const modalComponent = modal.componentInstance as ConfirmationModalComponent;

    modalComponent.text = `Are you sure you want to add movie
    ${movie.title}?`;

    modalComponent.title = 'Are you sure?';

    modal.result.then(
      () => {
        this.movieService.addMovie(movie).subscribe((newMovie) => {
          alert(`The movie has been added`);
          this.movies.push(newMovie);
        });
      },
      () => {
        // Rejected the operation.
      }
    );
  }

  // initialize movies and categories
  ngOnInit(): void {
    // To catch the id
    // this.movieId = Number(this.activatedRoute.snapshot.paramMap.get('id'));

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
  onDelete(movie: Movie): void {
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

  // Update movie
  public onUpdate(movie: Movie) {
    this.movieService.updateMovie(movie).subscribe(() => {
      alert(`The movie has been updated!`);
      const itemIndex = this.movies.findIndex((item) => item.id === movie.id);
      this.movies[itemIndex] = movie;
    });
  }

  // make changes on movie array
  edit(currentMovie: Movie): void {
    this.currentMovie = currentMovie;
  }
}

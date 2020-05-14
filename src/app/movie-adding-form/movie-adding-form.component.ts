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
  public movieTitle: string;
  public movieYear: number;
  public movieId: number;
  public movieCategory: Category;
  public youtubeId: string;
  public description: string;
  public movieRating: number;

  @ViewChild('movieInfoInputs') movieInfoInputs;
  @ViewChild('movieTitleInput') movieTitleInput;
  @ViewChild('movieYearInput') movieYearInput;
  @ViewChild('movieCategoryInput') movieCategoryInput;
  @ViewChild('movieUrlInput') movieUrlInput;
  @ViewChild('movieDescriptionInput') movieDescriptionInput;

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

  public currentMovieInfo(): void {
    console.log('inside the currentMovieInfo function');
    this.movieInfoInputs.nativeElement.disabled = false;
  }

  /**
   * Update Movie details
   */
  public updateMovie(movie: Movie): void {
    const newMovie: Movie = {
      id: movie.id,
      title: this.movieTitleInput.nativeElement.value,
      description: this.movieDescriptionInput.nativeElement.value,
      year: this.movieYearInput.nativeElement.value,
      url: this.movieUrlInput.nativeElement.value,
      category: movie.category,
    };
    console.log(newMovie);

    this.editMovie(newMovie);

    // this.movieService.updateMovie(newMovie).subscribe((movie) => {
    //   alert(`Movie updated ${movie.title}`);
    // });
    this.movieInfoInputs.nativeElement.disabled = true;
  }

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
    this.movieId = Number(this.activatedRoute.snapshot.paramMap.get('id'));

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
    console.log('inside edit Movie function');
    const modal = this.ngbModalService.open(ConfirmationModalComponent);
    const modalComponent = modal.componentInstance as ConfirmationModalComponent;

    modalComponent.text = `Are you sure you want to update movie
    ${movie.title}?`;

    modalComponent.title = 'Are you sure?';

    modal.result.then(
      () => {
        this.movieService.updateMovie(movie).subscribe(() => {
          alert(`The movie has been updated!`);
          const itemIndex = this.movies.findIndex(
            (item) => item.id === movie.id
          );
          this.movies[itemIndex] = movie;
          this.currentMovie = undefined;
        });
      },
      () => {
        // Rejected the operation.
      }
    );
  }

  // Editable table:
  // To update the field
  // updateList(id: number, property: string, event: any) {
  //     const editField = event.target.textContent;
  //     this.currentMovie[id][property] = editField;
  // }

  // changeValue(id: number, property: string, event: any) {
  //   this.editField = event.target.textContent;
  //  }
}

import { Component, OnInit } from '@angular/core';
import { MovieService } from '../shared/services/movie.service';
import { Movie } from '../shared/models/movie';
import { ConfirmationModalComponent } from '../modals/confirmation-modal/confirmation-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  public movies: Movie[] = [];

  constructor(
    private readonly movieService: MovieService,
    private readonly ngbModalService: NgbModal
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

  ngOnInit(): void {
    const movies$ = this.movieService.getMovies();
    movies$.subscribe((movies) => {
      this.movies = movies;
    });
  }
}

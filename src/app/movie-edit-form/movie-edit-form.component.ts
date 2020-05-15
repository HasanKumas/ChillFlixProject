import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationModalComponent } from '../modals/confirmation-modal/confirmation-modal.component';
import { Category } from '../shared/models/category';
import { Movie } from '../shared/models/movie';
import { MovieService } from '../shared/services/movie.service';

@Component({
  selector: 'app-movie-edit-form, [app-movie-edit-form]',
  templateUrl: './movie-edit-form.component.html',
  styleUrls: ['./movie-edit-form.component.css'],
})
export class MovieEditFormComponent implements OnInit {
  /** Original movie used to initialize this component */
  @Input()
  public movie: Movie;
  @Input()
  public categories: Category[];

  @Output()
  public delete = new EventEmitter<void>();
  @Output()
  public update = new EventEmitter<Movie>();

  /** Whether we are editing this movie at this point in time */
  public editing = false;

  /** Edit part of the form */
  public newMovie: Movie;

  constructor(
    private readonly movieService: MovieService,
    private readonly ngbModalService: NgbModal
  ) {}

  // save changes to backend
  onSaveClick() {
    console.log('inside edit Movie function');
    const modal = this.ngbModalService.open(ConfirmationModalComponent);
    const modalComponent = modal.componentInstance as ConfirmationModalComponent;

    modalComponent.text = `Are you sure you want to update movie
    ${this.movie.title}?`;

    modalComponent.title = 'Are you sure?';

    modal.result.then(
      () => {
        this.update.emit(this.newMovie);
        this.editing = false;
      },
      () => {
        // Rejected the operation.
        this.newMovie = { ...this.movie };
        this.editing = false;
      }
    );
  }

  public onEditClick() {
    this.editing = true;
  }

  public onDeleteClick() {
    this.delete.emit();
  }

  ngOnInit(): void {
    // Make a copy of the movie so we don't change it when we change newMovie
    // It does this, but then automatically
    // this.newMovie = {
    //   category: this.movie.category,
    //   description: this.movie.description,
    //   title: this.movie.title,
    //   ...
    // }
    this.newMovie = { ...this.movie };
  }

  public compareFn(optionOne: Category, optionTwo: Category): boolean {
    return !!optionOne && !!optionTwo && optionOne.id === optionTwo.id;
  }
}

import { Component, Output, EventEmitter, OnInit, Input } from '@angular/core';
import { Movie } from '../shared/models/movie';
import { MovieForm } from './movie.form';
import { CategoryService } from '../shared/services/category.service';
import { Category } from '../shared/models/category';
import { __values } from 'tslib';

@Component({
  selector: 'app-movie-form',
  templateUrl: './movie-form.component.html',
  styleUrls: ['./movie-form.component.css'],
})
export class MovieFormComponent implements OnInit {
  @Output()
  public save = new EventEmitter<Movie>();
  @Output()
  public edit = new EventEmitter<Movie>();
  @Input()
  editableMovie: Movie;

  public readonly form: MovieForm = new MovieForm();
  public get isFormValid(): boolean {
    return this.form.valid;
  }
  public categories: Category[] = [];
  constructor(private readonly categoryService: CategoryService) {}

  // initialize categories
  ngOnInit(): void {
    const categories$ = this.categoryService.getCategories();
    categories$.subscribe((categories) => {
      this.categories = categories;
    });
    // fill the form with existing values
    if (this.editableMovie) {
      this.form.patchValue({
        title: this.editableMovie.title,
        category: this.editableMovie.category.id,
        year: this.editableMovie.year,
        description: this.editableMovie.description,
        rating: this.editableMovie.rating,
        url: this.editableMovie.url,
      });
    }
  }

  public saveMovie(): void {
    if (this.form.valid) {
      this.save.emit(this.form.getModel(undefined));
    } else {
      alert('Form is not valid! Check the fields!');
    }
  }

  public editMovie(): void {
    if (this.form.valid) {
      this.edit.emit(this.form.getModel(this.editableMovie.id));
    } else {
      alert('Form is not valid! Check the fields!');
    }
  }
}

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieListComponent } from './movie-list.component';
import { MovieService } from '../shared/services/movie.service';
import { Movie } from '../shared/models/movie';
import { Category } from '../shared/models/category';
import { CategoryService } from '../shared/services/category.service';

fdescribe('MovieListComponent', () => {
  let component: MovieListComponent;
  let movieService: MovieService;
  let categoryService: CategoryService;
  let fixture: ComponentFixture<MovieListComponent>;
  class MockMovieService {
    movies$: Movie[] = [
      {
        id: 1,
        title: 'Matrix',
        category: { id: 1 },
        year: 1997,
        rating: 8,
        description: 'Matrix has a description',
        url: 'testURL',
        raterTotal: 1,
      },
      {
        id: 2,
        title: 'Matrix II',
        category: { id: 2 },
        year: 1999,
        rating: 7,
        description: 'Matrix has a description2',
        url: 'testURL2',
        raterTotal: 1,
      },
    ];

    getMovies() {
      return this.movies$;
    }
  }

  class MockCategoryService {
    categories: Category[] = [
      {
        id: 1,
        name: 'Drama',
      },
      {
        id: 2,
        name: 'Action',
      },
    ];
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MovieListComponent],
      providers: [
        MovieListComponent,
        { provide: MovieService, useClass: MockMovieService },
        { provide: CategoryService, useClass: MockCategoryService },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component = TestBed.inject(MovieListComponent);
    movieService = TestBed.inject(MovieService);
    categoryService = TestBed.inject(CategoryService);
  });

  it('should not have movies after construction', () => {
    expect(component.movies).toBeUndefined();
  });

  // it('should add movies after Angular calls ngOnInit', () => {
  //   component.ngOnInit();
  //   expect(component.movies).toEqual(movieService.getMovies().subscribe());
  // });
});

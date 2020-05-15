import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieListComponent } from './movie-list.component';
import { MovieService } from '../shared/services/movie.service';
import { Movie } from '../shared/models/movie';
import { Category } from '../shared/models/category';
import { CategoryService } from '../shared/services/category.service';
import { Observer, Observable } from 'rxjs';

const movies: Movie[] = [
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

const categories: Category[] = [
  {
    id: 1,
    name: 'Drama',
  },
  {
    id: 2,
    name: 'Action',
  },
];

const currentMovie: Movie = {
  id: 1,
  title: 'Matrix',
  category: { id: 1 },
  year: 1997,
  rating: 8,
  description: 'Matrix has a description',
  url: 'testURL',
  raterTotal: 1,
};

class MockMovieService {
  getMovies(url) {
    return Observable.create((observer: Observer<any>) => {
      observer.next(movies);
    });
  }
}

class MockCategoryService {
  getCategories(url) {
    return Observable.create((observer: Observer<any>) => {
      observer.next(categories);
    });
  }
}
let component: MovieListComponent;
let element: HTMLElement;

fdescribe('MovieListComponent', () => {
  let fixture: ComponentFixture<MovieListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MovieListComponent],
      providers: [
        MovieListComponent,
        { provide: MovieService, useClass: MockMovieService },
        { provide: CategoryService, useClass: MockCategoryService },
      ],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(MovieListComponent);
        component = fixture.debugElement.componentInstance;
        element = fixture.debugElement.nativeElement;
      });
  }));

  beforeEach(() => {
    fixture.detectChanges();
    component = TestBed.inject(MovieListComponent);
  });

  it('should make a call to movieService.getMovies()', () => {
    spyOn(component.movieService, 'getMovies').and.callThrough();
    component.ngOnInit();
    expect(component.movieService.getMovies).toHaveBeenCalled();
  });

  it('should set the movies after fetching data', async(() => {
    component.ngOnInit();
    fixture.whenStable().then(() => {
      expect(component.movies).toEqual(movies);
      expect(component.currentMovie).toEqual(movies[0]);
    });
  }));

  it('should make a call to categoryService.getCategories()', () => {
    spyOn(component.categoryService, 'getCategories').and.callThrough();
    component.ngOnInit();
    expect(component.categoryService.getCategories).toHaveBeenCalled();
  });

  it('should set the categories after fetching data', async(() => {
    component.ngOnInit();
    fixture.whenStable().then(() => {
      expect(component.categories).toEqual(categories);
    });
  }));
});

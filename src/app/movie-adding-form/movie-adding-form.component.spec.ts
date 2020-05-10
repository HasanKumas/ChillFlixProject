import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieAddingFormComponent } from './movie-adding-form.component';

describe('MovieAddingFormComponent', () => {
  let component: MovieAddingFormComponent;
  let fixture: ComponentFixture<MovieAddingFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovieAddingFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieAddingFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieEditFormComponent } from './movie-edit-form.component';

describe('MovieEditFormComponent', () => {
  let component: MovieEditFormComponent;
  let fixture: ComponentFixture<MovieEditFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovieEditFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieEditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

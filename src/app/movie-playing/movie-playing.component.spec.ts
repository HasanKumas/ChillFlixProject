import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoviePlayingComponent } from './movie-playing.component';

describe('MoviePlayingComponent', () => {
  let component: MoviePlayingComponent;
  let fixture: ComponentFixture<MoviePlayingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoviePlayingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoviePlayingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryAddingComponent } from './category-adding.component';

describe('CategoryAddingComponent', () => {
  let component: CategoryAddingComponent;
  let fixture: ComponentFixture<CategoryAddingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryAddingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryAddingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

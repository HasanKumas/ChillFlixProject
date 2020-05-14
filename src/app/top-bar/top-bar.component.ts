import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../shared/services/category.service';
import { Category } from '../shared/models/category';
import { LoginService } from '../shared/services/login.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css'],
})
export class TopBarComponent implements OnInit {
  // public loginStatus: boolean;
  public loggedIn$: Observable<boolean>;
  public username: string;
  categories: Category[];
  constructor(
    private readonly categoryService: CategoryService,
    private readonly loginService: LoginService
  ) {}

  public logout(): void {
    this.loginService.logout();
  }

  ngOnInit() {
    const categories$ = this.categoryService.getCategories();
    categories$.subscribe((categories) => {
      this.categories = categories;
    });
    this.loggedIn$ = this.loginService.loggedIn$;
    this.username = this.loginService.username;
  }
}

import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../shared/services/category.service';
import { Category } from '../shared/models/category';
import { LoginService } from '../shared/services/login.service';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css'],
})
export class TopBarComponent implements OnInit {
  public loginStatus: boolean;
  categories: Category[];
  constructor(
    private readonly categoryService: CategoryService,
    private readonly loginService: LoginService
  ) {}

  public getLoginStatus(): void {
    this.loginStatus = this.loginService.loggedIn;
    alert(this.loginStatus);
  }

  // public login(): void {
  //   this.loginStatus = this.loginService.login();
  // }

  public logout(): void {
    this.loginStatus = this.loginService.logout();
  }

  ngOnInit() {
    const categories$ = this.categoryService.getCategories();
    categories$.subscribe((categories) => {
      this.categories = categories;
    });
  }
}

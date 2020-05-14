import { Component, OnInit } from '@angular/core';
import { LoginService } from '../shared/services/login.service';
import { Observable } from 'rxjs';

import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  public loggedIn$: Observable<boolean>;
  public username: string;
  public password: string;

  constructor(
    private readonly loginService: LoginService,
    private readonly router: Router
  ) {
    this.loggedIn$ = loginService.loggedIn$;
  }

  // public get loggedIn(): boolean {
  //   return this.loginService.loggedIn;
  // }

  public login(): void {
    // this.loginService.login(this.username, this.password);

    this.loginService
      .login(this.username, this.password)
      .subscribe(() => this.router.navigate(['/login/admin']));
  }

  public logout(): void {
    this.loginService.logout();
  }
}

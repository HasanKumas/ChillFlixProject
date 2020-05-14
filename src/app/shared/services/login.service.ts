import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class LoginService {
  public readonly loggedIn$ = new BehaviorSubject<boolean>(false);
  public username = '';
  private adminUrl = 'http://localhost:8080/api/admin';

  constructor(private http: HttpClient, private router: Router) {}

  // public login(username: string, password: string): void {
  public login(username: string): void {
    alert('Logged in');
    this.loggedIn$.next(true);
    this.username = username;
    // const getLoggedInFun = this.getLoggedIn(username, password);
    // this.loggedIn$.next();
    // this.loggedIn$.next(this.getLoggedIn(username, password));
    // if (getLoggedInFun) {
    //   this.loggedIn$.next(getLoggedInFun);
    //   this.router.navigate(['login/admin']);
    // }
    // if (loggedInRouting){
    // }
  }

  // getLoggedIn(username: string, password: string): boolean {
  // getLoggedIn(username: string, password: string) {
  // const url = `${this.adminUrl}/?username=${username}&password=${password}`;
  // const logged = this.http.get<boolean>(url) as any;
  // this.http.get<boolean>(url).subscribe(
  // this.http.get<any>(url).subscribe(
  // (loggedReturn) => (logged = loggedReturn)
  // (error) => error as any
  // );
  // console.log(logged);
  // if (true) {
  //   this.router.navigate(['login/admin']);
  // return logged;
  // }
  // }

  public logout(): void {
    alert('Logged out');
    this.loggedIn$.next(false);
    this.username = '';
  }
}

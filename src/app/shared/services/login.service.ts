import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable, Subject } from 'rxjs';

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

  public login(username: string, password: string): Observable<void> {
    const callBack$ = new Subject<void>();
    const url = `${this.adminUrl}/?username=${username}&password=${password}`;
    this.http.get<boolean>(url).subscribe((result) => {
      if (result) {
        this.loggedIn$.next(true);
        this.username = username;
        callBack$.next();
      } else {
        alert('wrong');
        this.username = '';
      }
      callBack$.complete();
    });
    return callBack$.asObservable();
  }

  public logout(): void {
    alert('Logged out');
    this.loggedIn$.next(false);
    this.username = '';
  }
}

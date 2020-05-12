import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  public loggedIn = false;

  public login(): boolean {
    alert('Logged in');
    return (this.loggedIn = true);
  }
  public logout(): boolean {
    alert('Logged out');
    return (this.loggedIn = false);
  }
  constructor() {}
}

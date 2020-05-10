import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Movie } from '../models/movie';

/**
 * Movie service that keeps track of a list of movies
 */
@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private moviesUrl = 'http://localhost:8080/api/movies'; // URL to web api
  constructor(private readonly http: HttpClient) {}
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  /**
   * Adds a movie to the array
   */
  public addMovie(movie: Movie): Observable<Movie> {
    return this.http.post<Movie>(this.moviesUrl, movie);
  }

  /**
   * Returns all the movies.
   */
  public getMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>(this.moviesUrl);
  }

  /* GET movie by id.*/
  getMovie(id: number): Observable<Movie> {
    const url = `${this.moviesUrl}/${id}`;
    return this.http.get<Movie>(url);
  }

  /* GET movies whose title contains search term */
  searchMovies(term: string): Observable<Movie[]> {
    // const params = new HttpParams().set('params', term);
    if (!term.trim()) {
      return of([]);
    }
    return this.http.get<Movie[]>(`${this.moviesUrl}/search/?title=${term}`);
  }

  /* GET movies whose by category */
  getMoviesByCategory(id: number): Observable<Movie[]> {
    // const params = new HttpParams().set('params', id);
    // if (!id.trim()) {
    //   return of([]);
    // }
    return this.http.get<Movie[]>(`${this.moviesUrl}/category/?id=${id}`);
  }

  /** DELETE: delete the movie  from the server */
  deleteMovie(movie: Movie | number): Observable<Movie> {
    const id = typeof movie === 'number' ? movie : movie.id;
    const url = `${this.moviesUrl}/${id}`;

    return this.http.delete<Movie>(url, this.httpOptions);
  }

  /** PUT: update the movie on the server */
  updateMovie(movie: Movie): Observable<any> {
    const url = `${this.moviesUrl}/${movie.id}`;
    return this.http.put(url, movie, this.httpOptions);
  }
}

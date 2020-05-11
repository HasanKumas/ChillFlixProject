import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-movie-playing',
  templateUrl: './movie-playing.component.html',
  styleUrls: ['./movie-playing.component.css'],
})
export class MoviePlayingComponent implements OnInit {
  private movieId: string;
  public movieUrl: string;
  constructor(private readonly activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.movieId = this.activatedRoute.snapshot.params.id;
    this.movieUrl = `https://www.youtube.com/embed/${this.movieId}?rel=0&autoplay=1`;
    console.log(this.movieId);
  }
}

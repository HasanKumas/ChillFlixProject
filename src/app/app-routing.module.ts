import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MovieListComponent } from './movie-list/movie-list.component';
import { MovieAddingFormComponent } from './movie-adding-form/movie-adding-form.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { CategoryAddingComponent } from './category-adding/category-adding.component';
import { CategoryListComponent } from './category-list/category-list.component';
import { SearchResultsComponent } from './search-results/search-results.component';
import { MoviePlayingComponent } from './movie-playing/movie-playing.component';

const routes: Routes = [
  { path: 'movies', component: MovieListComponent },
  { path: 'movies/add', component: MovieAddingFormComponent },
  { path: 'movies/:movie.id', component: MovieDetailsComponent },
  { path: 'playing-movies/:id', component: MoviePlayingComponent },
  { path: 'categories', component: CategoryAddingComponent },
  { path: 'categories/:category.id', component: CategoryListComponent },
  { path: 'search/:movie.id', component: SearchResultsComponent },
  { path: '', redirectTo: 'movies', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

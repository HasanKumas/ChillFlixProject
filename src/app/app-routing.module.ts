import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MovieListComponent } from './movie-list/movie-list.component';
import { MovieAddingFormComponent } from './movie-adding-form/movie-adding-form.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { CategoryAddingComponent } from './category-adding/category-adding.component';
import { CategoryListComponent } from './category-list/category-list.component';
import { SearchResultsComponent } from './search-results/search-results.component';
import { MoviePlayingComponent } from './movie-playing/movie-playing.component';
import { AdminComponent } from './admin/admin.component';
import { LoginGuard } from './shared/services/login.guard';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: 'movies', component: MovieListComponent },
  {
    path: 'login/admin/movies/add',
    component: MovieAddingFormComponent,
    canActivate: [LoginGuard],
  },
  { path: 'movies/:movie.id', component: MovieDetailsComponent },
  { path: 'playing-movies/:id', component: MoviePlayingComponent },
  {
    path: 'login/admin/categories',
    component: CategoryAddingComponent,
    canActivate: [LoginGuard],
  },
  { path: 'categories/:category.id', component: CategoryListComponent },
  { path: 'search/:movie.id', component: SearchResultsComponent },
  { path: 'login/admin', component: AdminComponent, canActivate: [LoginGuard] },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: 'movies', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

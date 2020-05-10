import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { MovieListComponent } from './movie-list/movie-list.component';
import { SafePipe } from './shared/pipes/safe.pipe';
import { MovieAddingFormComponent } from './movie-adding-form/movie-adding-form.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { MovieSearchComponent } from './movie-search/movie-search.component';
import { CategoryAddingComponent } from './category-adding/category-adding.component';
import { CategoryListComponent } from './category-list/category-list.component';
import { MovieComponent } from './movie/movie.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SearchResultsComponent } from './search-results/search-results.component';
import { ConfirmationModalComponent } from './modals/confirmation-modal/confirmation-modal.component';
import { MovieFormComponent } from './movie-form/movie-form.component';

@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent,
    MovieListComponent,
    MovieAddingFormComponent,
    SafePipe,
    MovieDetailsComponent,
    MovieSearchComponent,
    CategoryAddingComponent,
    CategoryListComponent,
    MovieComponent,
    SearchResultsComponent,
    ConfirmationModalComponent,
    MovieFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

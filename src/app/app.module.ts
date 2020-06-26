import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';
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
import { MoviePlayingComponent } from './movie-playing/movie-playing.component';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { MovieEditFormComponent } from './movie-edit-form/movie-edit-form.component';
import { AppConfigService } from './shared/services/app-config.service';

const appInitializerFactory = (appConfig: AppConfigService) => {
  return () => {
    // Should be a promise!
    return appConfig.loadAppConfig();
  };
};

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
    MoviePlayingComponent,
    LoginComponent,
    AdminComponent,
    MovieEditFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      multi: true,
      deps: [AppConfigService],
      useFactory: appInitializerFactory,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

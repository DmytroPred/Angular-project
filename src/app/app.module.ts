import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Routes, RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CashFormaterPipe } from './cash-formater.pipe';
import { AddFilmModalComponent } from './add-film-modal/add-film-modal.component';
import { FilterPipe } from './filter-pipe.pipe';
import { FavoriteFilmsComponent } from './favorite-films/favorite-films.component';

const appRoutes: Routes = [
    { path: 'favorite', component: FavoriteFilmsComponent},
    { path: '**', redirectTo: '/'},
  ]

@NgModule({
  declarations: [
    AppComponent,
    CashFormaterPipe,
    AddFilmModalComponent,
    FilterPipe,
    FavoriteFilmsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatDialogModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

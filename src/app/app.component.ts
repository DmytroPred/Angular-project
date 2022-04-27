import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddFilmModalComponent } from './add-film-modal/add-film-modal.component';
import filmsData from '../assets/films.json';
import { Films } from './films-data';
import { HttpService } from './http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [HttpService]
})
export class AppComponent {

  searchText = '';
  films: Films[] = [];
  favFilms: Films[] = [];
  result: Films[] = [];
  getFilms: Films[] = [];
  selectedFilmName: string[] = [];

  otherTheme: boolean = false;
  otherView: boolean = false;
  favoriteFilms: boolean = false;
  favFilmsStatus: string = 'View favorite';
  themeStatus: string = 'Dark theme';
  viewStatus: string = 'List';


  // Change class of view element to 'list' or 'tile'.
  changeView() {
    this.otherView = !this.otherView;
    // Change button text content.
    this.viewStatus = this.otherView ? 'Tile' : 'List';
    // Save view status to local storage.
    localStorage.setItem('view', this.otherView ? 'List' : 'Tile');
  }

  // Change class of theme element to 'light theme' or 'dark theme'.
  changeTheme() {
    this.otherTheme = !this.otherTheme;
    // Change button text content.
    this.themeStatus = this.otherTheme ? 'Light theme' : 'Dark theme';
    // Save theme status to local storage.
    localStorage.setItem('theme', this.otherTheme ? 'Dark theme' : 'Light theme');
  }

  openFilmModal() {
    const dialogRef = this.dialog.open(AddFilmModalComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.addFilm(result);
      }
    });
  }

  // Add film to display array.
  addFilm(filmData: any) {
    let dateCreating = new Date();
    this.films.push({
      name: filmData.name,
      image: filmData.imageURL,
      cash: filmData.cash,
      year: filmData.date,
      creatingDate: dateCreating.toString(),
      actors: filmData.actors.map((actor: any) => actor.firstName + ' ' + actor.lastName),
      favorite: false,
    })
    // Update local storage.
    localStorage.setItem('filmsData', JSON.stringify(this.films));
  }

  // Display favorite films, if favorite yet, display all films.
  viewFavorite() {
    this.favoriteFilms = !this.favoriteFilms;
    // Change button text content.
    this.favFilmsStatus = this.favoriteFilms ? 'View all movie' : 'View favorite';

    if (this.favoriteFilms === true) {
      localStorage.setItem('favFilms', JSON.stringify(this.films.filter(film => film.favorite === true)));
      this.favFilms = JSON.parse(`${localStorage.getItem('favFilms')}`);
      this.films = this.favFilms;
    } else {
      this.films = JSON.parse(`${localStorage.getItem('filmsData')}`);
    }
  }

  // Add films to favorite.
  addToFavorite(index: number) {
    // Change favorite status of display films.
    this.films[index].favorite = !this.films[index].favorite;
    // Put in local storage favorite films from display films. 
    localStorage.setItem('favFilms', JSON.stringify(this.films.filter(film => film.favorite === true)));

    if (this.favoriteFilms) {
      // After user click on favorite button, name of clicked film stored in a variable.
      this.selectedFilmName.push(this.films[index].name);
      // Update storage data for immediately changing showing films.
      this.films = JSON.parse(`${localStorage.getItem('favFilms')}`);
      this.getFilms = JSON.parse(`${localStorage.getItem('filmsData')}`);

      // Find film in array by name and change favorite status.
      for (let i = 0; i < this.getFilms.length; i++) {
        if (this.selectedFilmName[0] === this.getFilms[i].name) {
          this.getFilms[i].favorite = false;
          // Saving changes to storage
          localStorage.setItem('filmsData', JSON.stringify(this.getFilms));
        }
      }
      // Clear variable for repeat use.
      this.selectedFilmName = [];
    } else { 
      localStorage.setItem('filmsData', JSON.stringify(this.films));
      this.favFilms = JSON.parse(`${localStorage.getItem('favFilms')}`);
    }
  }

  // Change class for fav button element.
  addToFav(index: number) {
    if (this.films[index].favorite) return true
    else return false
  }

  deleteFilm(index: number) {
    // After user click on delete button, name of film stored in a variable.
    this.selectedFilmName.push(this.films[index].name);
    // Delete film from visible.
    this.films.splice(index, 1);

    this.getFilms = JSON.parse(`${localStorage.getItem('filmsData')}`);
    // Find film in array by name and remove.
    for (let i = 0; i < this.getFilms.length; i++) {
      if (this.selectedFilmName[0] === this.getFilms[i].name) {
        this.getFilms.splice(i, 1);
      }
    }
    // Update storage data.
    localStorage.setItem('filmsData', JSON.stringify(this.getFilms));
    // Clear variable for repeat use.
    this.selectedFilmName = [];
  }
  // Find movie by name
  onSearch(event: any) {
    this.searchText = event.target.value;
    this.result = this.films.filter(film => film.name.toLowerCase().includes(this.searchText.toLowerCase()))
  }
  // Sort films.
  sortByName() {
    this.films.sort((a, b) => a.name.localeCompare(b.name));
  }
  sortByYear() {
    this.films.sort((a, b) => a.year - b.year);
  }
  sortByCreatingDate() {
    this.films.sort((a, b) => new Date(a.creatingDate).getTime() - new Date(b.creatingDate).getTime());
  }

  constructor(
    public dialog: MatDialog,
    private httpService: HttpService
  ) { }

  ngOnInit() {
    // Check view status after reload page.
    if (localStorage.getItem('view') === 'List') {
      this.otherView = true;
      this.viewStatus = 'Tile';
    } else {
      this.otherView = false;
      this.viewStatus = 'List';
    }
    // Check theme status after reload.
    if (localStorage.getItem('theme') === 'Dark theme') {
      this.otherTheme = true;
      this.themeStatus = 'Light theme';
    } else {
      this.otherTheme = false;
      this.themeStatus = 'Dark theme';
    }

    // Put data in storage and variable if empty, else get it from storage. 
    if (localStorage.getItem('filmsData') === null) {
      this.httpService.getData().subscribe((data: any) => this.films = data);
      localStorage.setItem('filmsData', JSON.stringify(filmsData));
    } else {
      this.films = JSON.parse(`${localStorage.getItem('filmsData')}`);
      this.favFilms = JSON.parse(`${localStorage.getItem('favFilms')}`);
    }
  }
}
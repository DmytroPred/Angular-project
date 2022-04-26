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

  title = 'files';
  searchText = '';
  result: Films[] = [];
  getFilms: Films[] = [];
  deleteFromArray: string[] = [];
  films: Films[] = [];
  favFilms: Films[] = [];

  otherTheme: boolean = false;
  otherView: boolean = false;
  favoriteFilms: boolean = false;
  favFilmsStatus: string = 'View favorite';
  themeStatus: string = 'Dark theme';
  viewStatus: string = 'List';



  // theme and view status check
  changeView() {
    this.otherView = !this.otherView;
    this.viewStatus = this.otherView ? 'Tile' : 'List';
    localStorage.setItem('view', this.otherView ? 'List' : 'Tile');
  }

  changeTheme() {
    this.otherTheme = !this.otherTheme;
    this.themeStatus = this.otherTheme ? 'Light theme' : 'Dark theme';
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
    localStorage.setItem('filmsData', JSON.stringify(this.films));
  }

  viewFavorite() {
    this.favoriteFilms = !this.favoriteFilms;
    this.favFilmsStatus = this.favoriteFilms ? 'View all movie' : 'View favorite';

    if (this.favoriteFilms === true) {
      localStorage.setItem('favFilms', JSON.stringify(this.films.filter(film => film.favorite === true)));
      this.favFilms = JSON.parse(`${localStorage.getItem('favFilms')}`);
      this.films = this.favFilms;
    } else {
      this.films = JSON.parse(`${localStorage.getItem('filmsData')}`);
    }
  }

  addToFavorite(index: number) {
    this.films[index].favorite = !this.films[index].favorite;
    localStorage.setItem('favFilms', JSON.stringify(this.films.filter(film => film.favorite === true)));

    if (this.favoriteFilms === false) {
      localStorage.setItem('filmsData', JSON.stringify(this.films));
      this.favFilms = JSON.parse(`${localStorage.getItem('favFilms')}`);
    } else {
      this.deleteFromArray.push(this.films[index].name);
      this.films = JSON.parse(`${localStorage.getItem('favFilms')}`);
      this.getFilms = JSON.parse(`${localStorage.getItem('filmsData')}`);

      for (let i = 0; i < this.getFilms.length; i++) {
        if (this.deleteFromArray[0] === this.getFilms[i].name) {
          this.getFilms[i].favorite = false;
          localStorage.setItem('filmsData', JSON.stringify(this.getFilms));
        }
      }
      this.deleteFromArray = [];
    }
  }
  addToFav(index: number) {
    if (this.films[index].favorite) return true
    else return false
  }

  deleteFilm(index: number) {
    this.deleteFromArray.push(this.films[index].name);
    this.films.splice(index, 1);
    this.getFilms = JSON.parse(`${localStorage.getItem('filmsData')}`);

    for (let i = 0; i < this.getFilms.length; i++) {
      if (this.deleteFromArray[0] === this.getFilms[i].name) {
        this.getFilms.splice(i, 1);
      }
    }
    localStorage.setItem('filmsData', JSON.stringify(this.getFilms));
    this.deleteFromArray = [];
  }

  onSearch(event: any) {
    this.searchText = event.target.value;
    this.result = this.films.filter(film => film.name.toLowerCase().includes(this.searchText.toLowerCase()))
  }

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
    if (localStorage.getItem('view') === 'List') {
      this.otherView = true;
      this.viewStatus = 'Tile';
    } else {
      this.otherView = false;
      this.viewStatus = 'List';
    }
    if (localStorage.getItem('theme') === 'Dark theme') {
      this.otherTheme = true;
      this.themeStatus = 'Light theme';
    } else {
      this.otherTheme = false;
      this.themeStatus = 'Dark theme';
    }

    if (localStorage.getItem('filmsData') === null) {
      this.httpService.getData().subscribe((data: any) => this.films = data);
      localStorage.setItem('filmsData', JSON.stringify(filmsData));
    } else {
      this.films = JSON.parse(`${localStorage.getItem('filmsData')}`);
      this.favFilms = JSON.parse(`${localStorage.getItem('favFilms')}`);
    }
  }
}
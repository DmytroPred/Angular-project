import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddFilmModalComponent } from './add-film-modal/add-film-modal.component';
import filmsData from './films.json';

interface Film {
  name: string;
  image: string;
  year: number;
  cash: string;
  creatingDate: string;
  actors: string[];
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'files';
  searchText = '';
  result: Film[] = [];

  films: Film[] = filmsData;

  otherTheme: boolean = false;
  otherView: boolean = false;
  themeStatus: string = 'Light Theme';
  viewStatus: string = 'Tile';



  // theme and view status check
  changeView() {
    this.otherView = !this.otherView;
    this.viewStatus = this.otherView ? 'List' : 'Tile';
    localStorage.setItem("view", this.viewStatus = this.otherView ? 'List' : 'Tile');
  }

  changeTheme() {
    this.otherTheme = !this.otherTheme;
    this.themeStatus = this.otherTheme ? 'Dark Theme' : 'Light Theme';
    localStorage.setItem("theme", this.themeStatus = this.otherTheme ? 'Dark Theme' : 'Light Theme');
  }

  openFilmModal() {
    const dialogRef = this.dialog.open(AddFilmModalComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.addFilm(result);
      }
      console.log(`Dialog result: ${result}`);
    });
  }

  addFilm(filmData: any) {
    let dateCreating = new Date();
    console.log(dateCreating.toJSON());
    console.log(filmData);
    this.films.push({
      name: filmData.name,
      image: filmData.imageURL,
      cash: filmData.cash,
      year: filmData.date,
      creatingDate: dateCreating.toString(),
      actors: filmData.actors.map((actor: any) => actor.firstName + ' ' + actor.lastName)
    })
  }

  deleteFilm(index: number) {
    this.films.splice(index, 1);
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

  constructor(public dialog: MatDialog) { }


  ngOnInit() {
    if (localStorage.getItem('view') === 'List') {
      this.otherView = true;
      this.viewStatus = 'List';
    } else this.otherView = false;

    if (localStorage.getItem('theme') === 'Dark Theme') {
      this.otherTheme = true;
      this.themeStatus = 'Dark Theme';
    } else this.otherTheme = false;
  }
}

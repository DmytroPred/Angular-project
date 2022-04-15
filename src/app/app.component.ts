import { Component } from '@angular/core';
// import { Film } from './film';
// import { FILMS } from './pack-films';
import filmsData from './films.json';

interface Film {
  name: string;
  image: string;
  year: number;
  cash: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'files';

  // films = FILMS;

  // film: Film = {
  //   name: '',
  //   image:  '',
  //   cash: '',
  //   year: 0
  // }
  films: Film[] = filmsData;

  otherTheme: boolean = false;
  otherView: boolean = false;
  themeStatus: string = 'Light Theme';
  viewStatus: string  = 'Tile';



// theme and view status check
  changeView() {
    this.otherView = !this.otherView;
    this.viewStatus = this.otherView ? 'List' : 'Tile';
    localStorage.setItem("view", this.viewStatus = this.otherView ? 'List' : 'Tile');
    // console.log(localStorage.getItem('view'));
  }


  changeTheme() {
    this.otherTheme = !this.otherTheme;
    this.themeStatus = this.otherTheme ? 'Dark Theme' : 'Light Theme';
    localStorage.setItem("theme", this.themeStatus = this.otherTheme ? 'Dark Theme' : 'Light Theme');
    // console.log(localStorage.getItem('theme'));
  }



  ngOnInit() {
    if(localStorage.getItem('view') === 'List') {
      this.otherView = true;
      this.viewStatus = 'List';
    } else this.otherView = false;


    // Object[number of object].element
    // console.log(FILMS[6].cash);
    // console.log(this.films[2].cash);


    if(localStorage.getItem('theme') === 'Dark Theme') {
      this.otherTheme = true;
      this.themeStatus = 'Dart Theme';
    } else this.otherTheme = false;
  }
}

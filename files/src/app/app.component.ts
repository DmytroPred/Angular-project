import { Component } from '@angular/core';
import { Film } from './film';
import { FILMS } from './pack-films';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'files';


  films = FILMS;

  film: Film = {
    name: 'fasfsa',
    image:  'dsad',
    cash: 'kd;sda',
    year: 1968
  }

  otherTheme: boolean = false;
  otherView: boolean = false;
  themeStatus: string = 'Light Theme';
  viewStatus: string  = 'List';

  changeView() {
    this.otherView = !this.otherView;
    this.viewStatus = this.otherView ? 'List' : 'Tile'
}


  changeTheme() {
    this.otherTheme = !this.otherTheme;
    this.themeStatus = this.otherTheme ? 'Dark Theme' : 'Light Theme'
}


}

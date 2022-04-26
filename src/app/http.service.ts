import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Films } from './films-data';

@Injectable()
export class HttpService {

  private dataUrl = 'assets/films.json';

  constructor(private http: HttpClient) { }

  public getData(): Observable<Films[]> {
    return this.http.get<Films[]>(this.dataUrl);
  }
}
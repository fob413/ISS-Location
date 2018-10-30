import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FunFactService {
  factId: number = factArray[Math.floor(Math.random()* factArray.length)];

  constructor(
    private http: Http
  ) { }

  getFact() {
    const newFactArray = factArray.filter((item) => {
      return item !== this.factId
    });
    const newFactId = newFactArray[Math.floor(Math.random()* factArray.length)];
    this.factId = newFactId;

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('token', localStorage.getItem('token'));
    return this.http.get(`http://localhost:3000/api/v1/fun-fact/${this.factId}`,
    { headers: headers })
      .pipe(map(res => res.json()));
  }

}

const factArray: Array<number> = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];

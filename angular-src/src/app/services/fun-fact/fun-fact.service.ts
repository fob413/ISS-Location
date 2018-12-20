import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FunFactService {
  factId: number = factArray[Math.floor(Math.random()* factArray.length)];

  constructor(
    private http: HttpClient
  ) { }

  getFact(): Observable<any> {
    const newFactArray = factArray.filter((item) => {
      return item !== this.factId
    });
    const newFactId = newFactArray[Math.floor(Math.random()* factArray.length)];
    this.factId = newFactId;

    return this.http.get<any>(`/api/v1/fun-fact/${this.factId}`)
  }

}

const factArray: Array<number> = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];

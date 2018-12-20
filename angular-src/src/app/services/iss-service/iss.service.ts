import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IssService {

  private url: string = `/api/v1/location`;

  getLocation(): Observable<Location> {
    return this.http.get<Location>(this.url);
  }

  constructor(private http: HttpClient) { }
}

interface Location {
  success: boolean;
  location: object;
}
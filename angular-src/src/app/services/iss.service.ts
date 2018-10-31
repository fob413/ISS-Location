import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IssService {

  private url: string = `api/v1/location`;

  getLocation(): Observable<Location> {
    let headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.get<Location>(this.url, { headers: headers });
  }

  constructor(private http: HttpClient) { }
}

interface Location {
  success: boolean;
  location: object;
}
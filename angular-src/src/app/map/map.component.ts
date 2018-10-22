import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  lat: number = 6.5244;
  lng: number = 3.3792;

  constructor() { }

  ngOnInit() {
  }

}

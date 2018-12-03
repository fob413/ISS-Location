import { Component, OnInit } from '@angular/core';
import { IssService } from '../../services/iss.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  latitude: number;
  longitude: number;
  zoom: number = 1.5;

  getLocation(): void {
    this.issService.getLocation().subscribe(
      data => {
        this.latitude = data['location']['latitude'];
        this.longitude = data['location']['longitude'];
      },
      err => console.error(err)
    );
  }

  constructor(private issService: IssService) { }

  ngOnInit() {
    this.getLocation();
  }

  ngAfterContentInit() {
    setInterval(() => {
      this.getLocation();
    }, 5000);
  }

}

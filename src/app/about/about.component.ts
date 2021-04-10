import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
})
export class AboutComponent implements OnInit {
  album;

  constructor() {
   // this.album = data.album_type;
  }

  ngOnInit(): void {}
}

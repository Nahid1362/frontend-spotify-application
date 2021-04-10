import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { MusicDataService } from '../music-data.service';
@Component({
  selector: 'app-new-releases',
  templateUrl: './new-releases.component.html',
  styleUrls: ['./new-releases.component.css'],
})
export class NewReleasesComponent implements OnInit, OnDestroy {
  releases: Array<any> = [];
  releasesSubscription: Subscription;

  constructor(
    private dataService: MusicDataService
  ) {}

  ngOnInit(): void {
    this.releasesSubscription = this.dataService
      .getNewReleases()
      .subscribe((data) => {
        console.log(data)
        this.releases = data.albums.items;
      });
  }

  toDate(x: number): string {
    let date = new Date(x);
    date.setDate(date.getDate() + 1);
    let string = new Intl.DateTimeFormat('en-US').format(date) + '';
    string =
      string.substring(0, string.length - 4) +
      string.substring(string.length - 2, string.length);
    return string;
  }
  
  ngOnDestroy(): void {
    if (this.releasesSubscription) {
      this.releasesSubscription.unsubscribe();
    }
  }
}

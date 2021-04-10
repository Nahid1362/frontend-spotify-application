import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { MusicDataService } from '../music-data.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css'],
})
export class SearchResultComponent implements OnInit {
  result: Array<any> = [];
  searchQuery: any = '';

  constructor(
    private queryParams: ActivatedRoute,
    private dataService: MusicDataService
  ) {}

  paramSubscription: Subscription;

  ngOnInit(): void {
    this.paramSubscription = this.queryParams.queryParams.subscribe(
      (params: Params) => {
        this.dataService.searchArtists(params.q).subscribe((data) => {
          this.searchQuery = params.q;
          this.result = data.artists.items.filter(
            (artist) => artist.images.length > 0
          );
        });
      }
    );
  }

  ngOnDestroy(): void {
    if (this.paramSubscription) {
      this.paramSubscription.unsubscribe();
    }
  }
}

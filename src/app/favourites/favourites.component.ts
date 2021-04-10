import { Component, OnInit } from '@angular/core';
import { MusicDataService } from '../music-data.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.css']
})
export class FavouritesComponent implements OnInit {

  favourites: Array<any>;
  paramSubscription: Subscription;

  constructor(
    private dataService : MusicDataService
  ) { }

  ngOnInit(): void {
    this.dataService.getFavourites().subscribe( data => {
      this.favourites = data.tracks;
    })
  }
  removeFromFavourites(id):void{
    this.dataService.removeFromFavourites(id).subscribe(data => this.favourites = data.tracks)
  }

  ngOnDestroy(): void {
    if (this.paramSubscription) {
      this.paramSubscription.unsubscribe();
    }
  }
}

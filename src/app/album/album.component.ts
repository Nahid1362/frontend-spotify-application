import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar'; 
import { ActivatedRoute, Params } from '@angular/router';
import { MusicDataService} from '../music-data.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})
export class AlbumComponent implements OnInit {

  album: any;
  paramSubscription: Subscription;

  constructor(private snackBar: MatSnackBar,
     private route: ActivatedRoute,
     private dataService: MusicDataService) { }

  ngOnInit(): void {
    this.paramSubscription= this.route.params.subscribe(
      (params: Params)=>
       this.dataService.getAlbumById(params.id).subscribe(data=>
        this.album= data)
    );
  }

  // The Music Icon (ie: "<mat-icon mat-list-icon>queue_music</mat-icon>" within the track listing must respond to a "click" event that invokes the function where id is the "id" value of the current "track", ie:"track.id
  addToFavourites(id: string) {
    this.dataService.addToFavourites(id).subscribe(
      (data)=>{
        this.snackBar.open('Adding to Favourites...', 'Done',{
          duration: 1500,
        });
      },
      (err)=>{
        this.snackBar.open('Unable to add song to Favourites...', 'Done',{
          duration: 1500,
        });
      }
    )
  }

  ngOnDestroy(): void {
    if (this.paramSubscription) {
      this.paramSubscription.unsubscribe();
    }
  }
}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { MusicDataService } from '../music-data.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-artist-discography',
  templateUrl: './artist-discography.component.html',
  styleUrls: ['./artist-discography.component.css'],
})
export class ArtistDiscographyComponent implements OnInit, OnDestroy {
  albums: Array<any> = [];
  artist: any;
  paramSubscription: Subscription;
  artistSubscription: Subscription;
  albumSubscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private dataService: MusicDataService
  ) {}

  ngOnInit(): void {
    this.paramSubscription = this.route.params.subscribe((params: Params) => {
      this.artistSubscription = this.dataService
        .getArtistById(params.id)
        .subscribe((data) => {
          this.artist = data;
        });
      this.albumSubscription = this.dataService
        .getAlbumsByArtistId(params.id)
        .subscribe((data) => {
          data.items.forEach((album) => {
            for (let i = 0; i < this.albums.length; i++) {
              if (this.albums[i].name == album.name) {
                return;
              }
            }
            this.albums.push(album);
          });
        });
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
    if (this.paramSubscription) {
      this.paramSubscription.unsubscribe();
    }
    if (this.albumSubscription) {
      this.albumSubscription.unsubscribe();
    }
    if (this.artistSubscription) {
      this.artistSubscription.unsubscribe();
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Artist } from '../models/artist';
import { BrankEdgeService } from '../services/brank-edge.service';

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.scss']
})
export class ArtistComponent implements OnInit {

  getArtist$: Subscription = new Subscription();

  artist: Artist = {
    mbid: '',
    name: '',
    type: '',
    originCountry: '',
    members: [],
    bannerImage: ''
  };
  mbid: string = "";

  constructor(private brankEdgeService: BrankEdgeService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.mbid = this.route.snapshot.paramMap.get('mbid')!;
    this.getArtist();
  }

  ngOnDestroy(): void {
    this.getArtist$.unsubscribe();
  }

  getArtist() {
    this.getArtist$ = this.brankEdgeService.getArtist(this.mbid).subscribe(result => {
      this.artist = result
      console.log(this.artist)
    });
  }

}

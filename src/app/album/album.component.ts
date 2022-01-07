import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Subscription } from 'rxjs';
import { FilledAlbum } from '../models/filled-album';
import { BrankEdgeService } from '../services/brank-edge.service';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.scss']
})
export class AlbumComponent implements OnInit {

  filledAlbum: FilledAlbum = {
    maid: '',
    name: '',
    image: '',
    genre: '',
    artist: {mbid: '', name: '', type: '', originCountry: '', members: [], bannerImage: ''},
    songs: [],
    release: ''
  };

  errorMessage: string = "";
  maid: string = "";
  getAlbum$: Subscription = new Subscription();
  deleteSong$: Subscription = new Subscription();

  albumLengthSeconds: number = 0;

  albumReady: boolean = false;

  constructor(private brankEdgeService: BrankEdgeService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.maid = this.route.snapshot.paramMap.get('maid')!
    this.getAlbum()
  }

  ngOnDestroy(): void {
    this.getAlbum$.unsubscribe();
    this.deleteSong$.unsubscribe();
  }

  getAlbum() {
    this.getAlbum$ = this.brankEdgeService.getAlbum(this.maid).subscribe(result => {
      this.filledAlbum = result

      this.albumLengthSeconds = this.filledAlbum.songs.reduce((acc, cur) => acc + cur.length, 0);

      this.albumReady = true;
    });
  }

  onClickSongTitle(isrc: string) {
    let songIndex = this.filledAlbum.songs.findIndex((song => song.isrc == isrc));
    if (this.filledAlbum.songs[songIndex].open) {
      this.filledAlbum.songs[songIndex].open = false;
    }
    else {
      this.filledAlbum.songs[songIndex].open = true;
    }
  }

  onDelete(ISRC: string) {
    this.deleteSong$ = this.brankEdgeService.deleteSong(ISRC).subscribe(result => {
      //all went well
      console.log(result);
      this.getAlbum();
    }, error => {
      //error
      console.log(error.message);
      this.errorMessage = error.message;
    });
  }

  add() {
    //Navigate to form in add mode
    this.router.navigate(['song/form'], {state: {mode: 'add'}});
  }

  edit(ISRC: string) {
    //Navigate to form in edit mode
    this.router.navigate(['song/form'], {state: {ISRC: ISRC, mode: 'edit'}});
  }


}

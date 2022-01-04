import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AlbumService } from '../album.service';
import { FilledAlbum } from '../filled-album';

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

  maid: string = "";
  getAlbum$: Subscription = new Subscription();

  albumLengthSeconds: number = 0;

  constructor(private albumService: AlbumService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.maid = this.route.snapshot.paramMap.get('maid')!
    this.getAlbum()
  }

  ngOnDestroy(): void {
    this.getAlbum$.unsubscribe();
  }

  getAlbum() {
    this.getAlbum$ = this.albumService.getAlbum(this.maid).subscribe(result => {
      this.filledAlbum = result

      this.albumLengthSeconds = this.filledAlbum.songs.reduce((acc, cur) => acc + cur.length, 0);
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

}

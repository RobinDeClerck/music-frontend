import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Album } from '../models/album';
import { Artist } from '../models/artist';
import { Genre } from '../models/genre';
import { Song } from '../models/song';
import { BrankEdgeService } from '../services/brank-edge.service';

@Component({
  selector: 'app-song-form',
  templateUrl: './song-form.component.html',
  styleUrls: ['./song-form.component.scss']
})
export class SongFormComponent implements OnInit, OnDestroy {
  isAdd: boolean = false;
  isEdit: boolean = false;
  songISRC: string = "";

  artists: Artist[] = []
  getArtists$: Subscription = new Subscription();

  genres: Genre[] = []
  getGenres$: Subscription = new Subscription();

  albums: Album[] = []
  getAlbums$: Subscription = new Subscription();

  song: Song = {id:0, genre: "", title: "", length: 0, url: "", maid: "", mbid: "", isrc: "", open: false};

  isSubmitted: boolean = false;
  errorMessage: string = "";

  song$: Subscription = new Subscription();
  postSong$: Subscription = new Subscription();
  putSong$: Subscription = new Subscription();

  constructor(private router: Router, private brankEdgeService: BrankEdgeService) {
    this.isAdd = this.router.getCurrentNavigation()?.extras.state?.mode === 'add';
    this.isEdit = this.router.getCurrentNavigation()?.extras.state?.mode === 'edit';
    this.songISRC = this.router.getCurrentNavigation()?.extras.state?.ISRC;

    if (this.songISRC != null && this.songISRC != "") {
      this.song$ = this.brankEdgeService.getSong(this.songISRC).subscribe(result => this.song = result);
    }

  }

  ngOnInit(): void {
    this.getAlbums();
    this.getGenres();
    this.getArtists();
  }

  ngOnDestroy(): void {
    this.song$.unsubscribe();
    this.postSong$.unsubscribe();
    this.putSong$.unsubscribe();

    this.getArtists$.unsubscribe();
    this.getGenres$.unsubscribe();
    this.getAlbums$.unsubscribe();
  }

  getAlbums() {
    this.getAlbums$ = this.brankEdgeService.getAlbums().subscribe(result => {
      this.albums = result
    });
  }

  getGenres() {
    this.getGenres$ = this.brankEdgeService.getGenres().subscribe(result => {
      this.genres = result
    });
  }

  getArtists() {
    this.getArtists$ = this.brankEdgeService.getArtists().subscribe(result => {
      this.artists = result
    });
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.isAdd) {
      this.postSong$ = this.brankEdgeService.postSong(this.song).subscribe(result => {
                //all went well
                this.router.navigateByUrl("/");
              },
              error => {
                this.errorMessage = error.message;
                console.log(this.errorMessage);
              });
    }
    if (this.isEdit) {
      this.putSong$ = this.brankEdgeService.putSong(this.songISRC, this.song).subscribe(result => {
                //all went well
                this.router.navigateByUrl("/");
              },
              error => {
                this.errorMessage = error.message;
                console.log(this.errorMessage);
              });
    }
  }

}

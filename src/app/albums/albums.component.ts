import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Album } from '../album';
import { AlbumService } from '../album.service';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.scss']
})
export class AlbumsComponent implements OnInit {

  albums: Album[] = []
  getAlbums$: Subscription = new Subscription();

  constructor(private albumService: AlbumService) { }

  ngOnInit(): void {
    this.getAlbums()
  }

  ngOnDestroy(): void {
    this.getAlbums$.unsubscribe();
  }

  getAlbums() {
    this.getAlbums$ = this.albumService.getAlbums().subscribe(result => {
      this.albums = result
      console.log(this.albums)
      //console.log(result)
    });
  }
}

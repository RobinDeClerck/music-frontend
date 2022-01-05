import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Album } from '../models/album';
import { BrankEdgeService } from '../services/brank-edge.service';
@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.scss']
})
export class AlbumsComponent implements OnInit {

  albums: Album[] = []
  getAlbums$: Subscription = new Subscription();

  albumReady: boolean = false;

  constructor(private brankEdgeService: BrankEdgeService) { }

  ngOnInit(): void {
    this.getAlbums()
  }

  ngOnDestroy(): void {
    this.getAlbums$.unsubscribe();
  }

  getAlbums() {
    this.getAlbums$ = this.brankEdgeService.getAlbums().subscribe(result => {
      this.albums = result
      this.albumReady = true
    });
  }
}

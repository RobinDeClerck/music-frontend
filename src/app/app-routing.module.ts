import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlbumComponent } from './album/album.component';
import { AlbumsComponent } from './albums/albums.component';
import { ArtistComponent } from './artist/artist.component';
import { GenreComponent } from './genre/genre.component';

const routes: Routes = [
  { path: '', component: AlbumsComponent },
  { path: 'album/:maid', component: AlbumComponent },
  { path: 'genre/:genre', component: GenreComponent },
  { path: 'artist/:mbid', component: ArtistComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

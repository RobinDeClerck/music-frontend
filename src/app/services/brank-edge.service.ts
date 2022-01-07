import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Album } from '../models/album';
import { Artist } from '../models/artist';
import { FilledAlbum } from '../models/filled-album';
import { Genre } from '../models/genre';
import { Song } from '../models/song';

@Injectable({
  providedIn: 'root'
})
export class BrankEdgeService {

  constructor(private httpClient: HttpClient) {}

  getAlbums(): Observable<Album[]> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    return this.httpClient.get<Album[]>(environment.BRANK_EDGE_BASEURL + "/albums", httpOptions);
  }

  getAlbum(maid: string): Observable<FilledAlbum> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    return this.httpClient.get<FilledAlbum>(environment.BRANK_EDGE_BASEURL + "/albums/" + maid, httpOptions);
  }

  getGenre(name: string): Observable<Genre> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    return this.httpClient.get<Genre>(environment.BRANK_EDGE_BASEURL + "/genres/" + name, httpOptions);
  }

  getArtist(mbid: string): Observable<Artist> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    return this.httpClient.get<Artist>(environment.BRANK_EDGE_BASEURL + "/artists/" + mbid, httpOptions);
  }


  getSong(ISRC: string): Observable<Song> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    return this.httpClient.get<Song>(environment.BRANK_EDGE_BASEURL + "/songs/" + ISRC, httpOptions);
  }

  postSong(song: Song): Observable<Song> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');

    return this.httpClient.post<Song>(environment.BRANK_EDGE_BASEURL + "/songs/", {headers: headers});
}

  putSong(ISRC:string, song: Song): Observable<Song> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');

    let rsong = {id:song.id, genre: song.genre, title:song.title, length: song.length, url: song.url, maid: song.maid, mbid: song.mbid, isrc: song.isrc}

    console.log(rsong);

    return this.httpClient.put<Song>(environment.BRANK_EDGE_BASEURL + "songs", rsong, {headers: headers});
  }

  deleteSong(ISCR: string): Observable<Song> {
    return this.httpClient.delete<Song>(environment.BRANK_EDGE_BASEURL + "/songs/" + ISCR);
  }

}


